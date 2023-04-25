const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Succesfully connected to database');
  server = app.listen(config.port, () => {
    logger.info(`Server listening to port ${config.port}`);
    logger.info(`Server ready for requests`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server shut down');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received; server process being terminated');
  if (server) {
    server.close();
    logger.info('Server process terminated successfully');
  }
});
