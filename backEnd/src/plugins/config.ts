import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fastifyEnv from '@fastify/env';
import { FromSchema } from "json-schema-to-ts";

export enum NodeEnvEnum {
    dev = 'development',
    prod = 'production'
}

const configSchema = {
    type: 'object',

    properties: {

        OPENAI_API_KEY: {
            type: "string",
            default: 'key'
        },
        AUDIO_URL: {
            type: "string",
            default: 'key'
        },
        AUDIO_CREDENTIALS: {
            type: "string",
            default: 'key'
        }
    }
} as const;

type ConfigType = FromSchema<typeof configSchema>;

declare module 'fastify' {
    interface FastifyInstance {
        config: ConfigType
    }
};

const configPlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    try {
        const envOptions = {
            confKey: 'config', // optional, default: 'config'
            schema: configSchema,
            dotenv: true // load .env if it is there, default: false
            // data: data  optional, default: process.env
        };
        fastify
            .register(fastifyEnv, envOptions)
            .ready((err) => {
                if (err) { console.error(err); }
                else {
                    fastify.log.level = fastify.config.LOG_LEVEL;
                    // or fastify[options.confKey]
                    //   console.log(fastify.getEnvs())
                }
            })
        console.log('✅ Config Plugin loaded');
    } catch (e) {
        console.warn('⚠️  Config Plugin not initialized:', e);
        throw new Error('Failed to register configPlugin');
    }
};

export default fp(configPlugin, { name: 'configPlugin' });