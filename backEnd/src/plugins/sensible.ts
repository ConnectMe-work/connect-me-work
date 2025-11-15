import fp from 'fastify-plugin';
import sensible from '@fastify/sensible';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */

const senssiblePlugin: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  await fastify.register(sensible, {
    errorHandler: false,
  });
};

export default fp(senssiblePlugin, { name: 'senssiblePlugin' });