import buildFastifyApp from "./app";

const start = async () => {

  const app = await buildFastifyApp();


  // Graceful shutdown

  const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
  signals.forEach((signal) => {
    process.on(signal, async () => {
      try {
        await app.close();
        app.log.error(`Closed application on ${signal}`);
        process.exit(0);
      } catch (err) {
        app.log.error(`Error closing application on ${signal}, ${err}`);
        process.exit(1);
      }
    });
  });

  try {
    await app.listen({ port: app.config.LISTEN_PORT, host: app.config.HOST });
    console.log(`Server is running on http://${app.config.HOST}:${app.config.LISTEN_PORT}`);
    console.log(`Swagger is running on http://${app.config.HOST}:${app.config.LISTEN_PORT}/docs`);
    //   console.log('Plugins');
    // console.log(app.printPlugins());
    // console.log('Routes');
    //  console.log(app.printRoutes());
    /*   console.log('--Loaded plugins---');
      console.log(app.printPlugins()); */
    // console.log(process.env)
  } catch (err) {
    console.error('Error starting server:', err);
    app.log.error(err);
    process.exit(1);
  }
};

start();
