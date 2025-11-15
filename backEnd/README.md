# ConnectMe API Backend

This is the backend API for the ConnectMe platform, built with [Fastify](https://www.fastify.io/). It provides RESTful endpoints for workforce management, AI-powered assistant, audio transcription, and more.

## Tech Stack

- **Fastify**: High-performance Node.js web framework
- **TypeScript**: Type-safe backend code
- **Zod**: Schema validation
- **Swagger**: API documentation
- **Axios**: HTTP client for proxying requests
- **OpenAI**: AI assistant integration

## Main Features

- **Audio Transcription**: Upload audio files and receive transcribed text
- **AI Assistant**: Ask questions and get AI-generated responses
- **CORS, Helmet, Sensible**: Security and utility plugins

## API Routes

### `/v1/connect/audio`

- **POST**: Upload an audio file (multipart/form-data) and receive transcription.
- **Schema**: See [`audioResponseSchema`](src/routes/v1/connect/audio/audioSchema.ts)

### `/v1/connect/assistant`

- **POST**: Ask a question to the AI assistant and receive a streamed response.
- **Schema**: See [`askAssistantSchema`](src/routes/v1/connect/assistant/assistanSchema.ts)

## Plugins

- **CORS**: [`corsPlugin`](src/plugins/cors.ts)
- **Helmet**: [`helmetPlugin`](src/plugins/helmet.ts)
- **Error Handler**: [`errorHandlerPlugin`](src/plugins/errorHandler.ts)
- **Config Loader**: [`configPlugin`](src/plugins/config.ts)
- **Sensible**: [`senssiblePlugin`](src/plugins/sensible.ts)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Build:
   ```bash
   npm run build
   ```
3. Run in development mode:
   ```bash
   npm run dev
   ```

## Configuration

Environment variables are loaded via `.env` and validated by [`configPlugin`](src/plugins/config.ts). See the config schema for required variables.

## License

This project is licensed as **Private**. See [LICENSE](LICENSE) for details.
