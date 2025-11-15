
import { FastifyRequest } from "fastify";
import { LoggerOptions } from "pino";

export const LoggerConfig: LoggerOptions = {
  level: process.env.LOG_LEVEL,
  name: "connet-api",
  //  transport: undefined,  // Force defaults to raw JSON, so single line logs is used
  transport: {
    targets: [

      {
        target: 'pino-pretty',//'pino/file',
        options: { destination: 1 }
      }
    ]
  },
  timestamp: () => {
    const dateString = new Date(Date.now()).toISOString()
    return `,"@timestamp":"${dateString}"`
  },
  redact: {
    censor: '***',
    paths: [
      'req.headers.authorization',
      'req.body.password',
      'req.body.email',
      'req.body.file',
    ]
  },
  serializers: {
    req: function (request: FastifyRequest) {
      // const shouldLogBody = request.routeOptions?.config.logBody === true
      //  const shouldLogBody = true;
      const shouldLogBody = request?.body && typeof request.body !== 'object'
        ? request.body
        : undefined

      return {
        method: request.method,
        url: request.raw.url,
        routeUrl: request.routeOptions.url,
        connectAgent: request.headers?.['connect-agent'],
        connectAppSource: request.headers?.['connect-app-source'],
        headers: request.headers,
        // version: request.headers?.['accept-version'],  
        body: shouldLogBody ? request?.body : undefined,
        hostname: request.hostname,
        //  headers: request.headers,
        remoteAddress: request.ip,
        remotePort: request.socket?.remotePort
      }
    },
    res: function (reply: any) {
      return {
        statusCode: reply.statusCode,
        responseTime: reply.elapsedTime
      }
    }
  }
}
