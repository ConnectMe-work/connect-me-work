import { FastifyReply, FastifyRequest } from 'fastify';
import FormData from 'form-data';
import axios from 'axios';
import { Readable } from 'stream';


export async function audioProxy(request: FastifyRequest, reply: FastifyReply) {
    // --- Incoming upload timeout ---
    const uploadTimeoutMs = 30000; // 30 seconds
    const uploadTimer = setTimeout(() => {
        reply.code(408).send({ error: 'Upload timed out' });
        request.raw.destroy(); // abort client upload
    }, uploadTimeoutMs);

    try {
        // --- Read the first file part ---
        const part = await request.file();
        if (!part) {
            clearTimeout(uploadTimer);
            return reply.status(400).send({ error: 'No file uploaded' });
        }

        clearTimeout(uploadTimer); // file received, clear upload timer

        const fields = part.fields as any;

        const lang: string = fields?.lng?.value || 'en';
        request.log.info({ lang, filename: part.filename }, 'Upload received ');


        const form = new FormData();
        form.append('data', part.file as Readable, {
            filename: part.filename || 'audio.webm',
            contentType: part.mimetype || 'audio/mpeg'
        });


        form.append('lang', lang);

        // --- Upstream request timeout using AbortController ---
        const upstreamTimeoutMs = 60000; // 60 seconds
        const controller = new AbortController();
        const upstreamTimer = setTimeout(() => controller.abort(), upstreamTimeoutMs);


        try {
            const axiosResp = await axios.post(request.server.config.AUDIO_URL, form, {
                headers: {
                    ...form.getHeaders(),
                    Authorization: request.server.config.AUDIO_CREDENTIALS
                },
                responseType: 'arraybuffer',
                maxBodyLength: Infinity,
                maxContentLength: Infinity,
                signal: controller.signal,
            });

            clearTimeout(upstreamTimer);
            const contentType = axiosResp.headers['content-type'];
            if (contentType) reply.header('content-type', contentType);

            reply.status(axiosResp.status).send(axiosResp.data);
        } catch (err: any) {
            clearTimeout(upstreamTimer);
            if (axios.isCancel(err)) {
                return reply.status(504).send({ error: 'Upstream request timed out' });
            }
            request.log.error(err);
            return reply.status(err.response?.status || 500).send({ error: 'Upstream error', details: err.message });
        }

    } catch (err: any) {
        clearTimeout(uploadTimer);
        request.log.error(err);
        return reply.status(500).send({ error: 'Internal server error', details: err.message });
    }
};