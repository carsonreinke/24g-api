import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import applyRoutes from './routes';
import { createConnection } from 'typeorm';
import morgan from 'morgan';
import swagger from 'swagger-ui-express';
import YAML from 'yamljs';

process.on('uncaughtException', error => {
  console.log(error);
  process.exit(1);
});

process.on('unhandledRejection', error => {
  console.log(error);
  process.exit(2);
});

createConnection();

const app = express();
const router = express.Router();

// Request logging
app.use(morgan('dev'));

// Parse JSON bodies
app.use(bodyParser.json());

// Provide Swagger documention
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/docs', swagger.serve, swagger.setup(swaggerDocument));

// Routes
applyRoutes(router);
app.use(router);

const { PORT = 8080 } = process.env;
const server = http.createServer(app);

server.listen(PORT, () =>
  console.log(`Server is running http://localhost:${PORT}...`)
);