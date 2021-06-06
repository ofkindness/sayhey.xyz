import { config } from 'dotenv';
import http from 'http';
import { debuglog } from 'util';

// import ngrok from 'ngrok';

import app from './app';
// import bot from ('../modules/bot');

config();
debuglog('postgres');

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

interface Error {
  syscall?: string;
  code?: string;
}

(async () => {
  /**
   * Setup webhook url.
   */

  //   bot(process.env.WEBHOOK_URL || await ngrok.connect(port));

  /**
   * Create HTTP server.
   */

  const server = http.createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */

  server.listen(port);

  /**
   * Event listener for HTTP server "error" event.
   */
  /* eslint no-console: 0 */
  server.on('error', (error: Error) => {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  });

  /**
   * Event listener for HTTP server "listening" event.
   */

  server.on('listening', () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
    debuglog(`Listening on ${bind}`);
  });

  return null;
})();