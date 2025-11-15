
import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { audioProxy } from './audiHandler';
import { audioResponseSchema } from './audioSchema';
import zodToJsonSchema from 'zod-to-json-schema';
import multipart from '@fastify/multipart';
import { SwaggerSectionTags } from '../../../../manual/swagger';



const AudioRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  await fastify.register(multipart, {
    attachFieldsToBody: false,
    limits: {
      fieldNameSize: 100, // Max field name size in bytes
      fieldSize: 25 * 1024 * 1024,     //   Max field value size in bytes
      fields: 10,         // Max number of non-file fields
      fileSize: 25 * 1024 * 1024,     // 25MB  or multipart forms, the max file size in bytes
      files: 1,           // Max number of file fields
      headerPairs: 2000,  // Max number of header key=>value pairs
      parts: 1000         // For multipart forms, the max number of parts (fields + files)
    }
  });

  fastify.post('/', {
    schema: {
      tags: [SwaggerSectionTags.attachment.name],
      consumes: ['multipart/form-data'],
      response: {
        200: zodToJsonSchema(audioResponseSchema)
      }
    },
    handler: audioProxy
  });
};

export default AudioRoutes;