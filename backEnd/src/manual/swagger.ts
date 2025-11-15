
import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import SwaggerUI from '@fastify/swagger-ui';
import Swagger from '@fastify/swagger'
import _ from 'lodash';

interface SwaggerTagsType {

  [key: string]: { name: string, description: string };
}
export const SwaggerSectionTags: SwaggerTagsType = {
  audio: { name: 'Audio proxy', description: 'Manage audio proxy to other server' },
  assistant: { name: 'Assistant', description: 'AI assistant ' },
}

const swaggerPlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {

  const tags = (Object.keys(SwaggerSectionTags) as Array<keyof SwaggerTagsType>).map(key => SwaggerSectionTags[key])
  await fastify.register(Swagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Scheduling API',
        description: 'Scheduling API swagger',
        version: '0.1.0'
      },
      servers: [
        {
          url: 'http://localhost:3001',
          description: 'Development server'
        }
      ],
      tags: tags,
      /*  components: {
         securitySchemes: {
           apiKey: {
             type: 'apiKey',
             name: 'apiKey',
             in: 'header'
           }
         }
       }, */

    }
  })
  await fastify.register(SwaggerUI, {
    routePrefix: '/docs',
    uiConfig: {
      //  docExpansion: 'full',
      deepLinking: false,
      docExpansion: 'none',
    },
    uiHooks: {
      onRequest: function (request, reply, next) { next() },
      preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
  })
}
//export default fp(swaggerPlugin, { dependencies: ['application-config'] });

export default fp(swaggerPlugin, { name: 'swaggerPlugin' });

/* 
module.exports = fp(async function swaggerPlugin(fastify, opts) {
  fastify.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'Fastify app',
        description: 'Fastify Book examples',
        version: pkg.version
      }
    }
  })
  fastify.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    exposeRoute: fastify.secrets.NODE_ENV !== 'production'
  })
}, { dependencies: ['application-config'] })
 */