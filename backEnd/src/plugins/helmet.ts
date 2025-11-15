import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import helmet from '@fastify/helmet';
import { t } from 'i18next';

const helmetPlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  try {
    await fastify.register(helmet, {
      global: true,
      crossOriginResourcePolicy: {
        policy: "cross-origin"
      }
    });
    console.log('✅ Helmet Plugin loaded');
  } catch (error) {
    console.warn('⚠️  Helmet Plugin not initialized:', error);
    throw error;
  }
};

export default fp(helmetPlugin, { name: 'helmetPlugin' });