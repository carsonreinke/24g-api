import express from 'express';
import bodyParser from 'body-parser';
import applyRoutes from './routes';
import morgan from 'morgan';
import swagger from 'swagger-ui-express';
import YAML from 'yamljs';

export default async () => {
  const app = express();
  const router = express.Router();

  // Request logging (but not under testing environment)
  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
  }

  // Parse JSON bodies
  app.use(bodyParser.json());

  // Provide Swagger documention
  const swaggerDocument = YAML.load('./swagger.yaml');
  app.use('/docs', swagger.serve, swagger.setup(swaggerDocument));

  // Routes
  applyRoutes(router);
  app.use(router);

  return app;
}