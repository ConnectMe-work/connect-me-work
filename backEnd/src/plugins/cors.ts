import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fastifyCors from '@fastify/cors';

const corsPlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  try {
    await fastify.register(fastifyCors, {
      origin: true,
    });
    console.log('✅ CORS Plugin loaded');
  }
  catch (e) {
    console.warn('⚠️  CORS Plugin not initialized:', e);
  }
};

export default fp(corsPlugin, { name: 'corsPlugin' });