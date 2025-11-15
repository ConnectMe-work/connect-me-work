import path from 'node:path'
import Fastify, { FastifyInstance } from 'fastify'
import AutoLoad from '@fastify/autoload'
import { LoggerConfig } from './configs/loggerOptions';
import swaggerPlugin from './manual/swagger'

async function buildFastifyApp(opts = {}): Promise<FastifyInstance> {
  console.log('Build App started ');
  try {
    const app = Fastify({
      ...opts,
      disableRequestLogging: true,
      logger: LoggerConfig,
      requestIdHeader: 'x-request-id',

      genReqId() { return crypto.randomUUID() },
      ajv: {
        customOptions: {
          coerceTypes: 'array',
          removeAdditional: 'all'
        }
      }
    });

    app.server.keepAliveTimeout = 60000;
    app.server.headersTimeout = 65000;
    app.server.requestTimeout = 300000; //5min

    void app.register(AutoLoad, {
      dir: path.join(__dirname, 'plugins'),
      dirNameRoutePrefix: false,
    })

    void app.register(swaggerPlugin);
    void app.register(AutoLoad, {
      dir: path.join(__dirname, 'routes'),
      indexPattern: /.*routes(\.js|\.ts)$/i,
      autoHooks: true,
      cascadeHooks: true,
      autoHooksPattern: /.*hooks(\.js|\.ts)$/i,
    })

    await app.ready();
    console.log('✅✅✅ Fastify App initialized');
    return app;
  } catch (error) {
    console.error('⚠️  Fastify App not initialized:', error);
    throw new Error('Fastify App initialization failed');
  }
}

export default buildFastifyApp;