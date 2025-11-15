
import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { askAssistantSchema } from './assistanSchema';
import { askAssistant } from './assistanceHandler';
import { SwaggerSectionTags } from '../../../../manual/swagger';

const AskAssistantRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    const server = fastify;

    server.post('/', {
        schema: {
            tags: [SwaggerSectionTags.assistant.name],
            body: zodToJsonSchema(askAssistantSchema),
        },
        handler: askAssistant
    })


    /*  
    
        server.options("/", async (_, reply) => {
            // Preflight response
            reply
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "POST, OPTIONS")
                .header("Access-Control-Allow-Headers", "Content-Type")
                .send();
        });
     */

}

export default AskAssistantRoutes; 