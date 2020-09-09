import http from 'http';
import app from './server';
import { createConnection } from 'typeorm';

process.on('uncaughtException', error => {
  console.log(error);
  process.exit(1);
});

process.on('unhandledRejection', error => {
  console.log(error);
  process.exit(2);
});

(async () => {
  await createConnection();

  const { PORT = 8080 } = process.env;
  const server = http.createServer(await app());

  server.listen(PORT, () =>
    console.log(`Server is running http://localhost:${PORT}...`)
  );
})();