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


    fastify.setErrorHandler(function customErrorHandler(err, req, reply) {
      console.log('Error Handler:', err);

      if (reply.statusCode >= 500) {
        req.log.error({ req, res: reply, err }, err?.message)
        const error = new Error(`Fatal error. Contact the support team with the id ${req.id}`)
        reply.send(error)
        return
      }
      req.log.info({ req, res: reply, err }, err?.message)
      console.log('Error Handler:', err);
      reply.status(err.statusCode || 500).send({
        ...err,
        error: err.name || 'Error',
        message: err.message,
        statusCode: err.statusCode || 500
      });
    })
    done()
    console.log('✅ Error Handler Plugin loaded');
  } catch (e) {
    console.warn('⚠️  Error Handler Plugin not initialized:', e);
    throw new Error('Failed to register errorHandler Plugin');
  }

}

export default fp(errorHandlerPlugin, { name: 'errorHandlerPlugin' });