import { FastifyInstance, FastifyPluginCallback, FastifyPluginOptions } from 'fastify';
import fp from 'fastify-plugin';



const errorHandlerPlugin: FastifyPluginCallback = (fastify: FastifyInstance, options: FastifyPluginOptions, done) => {
  try {
    fastify.addHook('onRequest', async function onRequestLogHook(req) {
      req.log.info({ req }, 'incoming request 🔮')
    })
    fastify.addHook('onSend', async function onSendRequestLogHook(req, res) {
      req.log.info({ req, res }, 'request completed 🎉')
    })

    done()
    console.log('✅ Error Handler Plugin loaded');
  } catch (e) {
    console.warn('⚠️  Error Handler Plugin not initialized:', e);
    throw new Error('Failed to register errorHandler Plugin');
  }

}

export default fp(errorHandlerPlugin, { name: 'errorHandlerPlugin' });