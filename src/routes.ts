import { Router, Request, Response, NextFunction } from 'express';
import * as pageController from './controllers/page';
import { ControllerMethod } from './controllers/general';

/**
 * Route handler delegates to controller action
 *
 * @param action
 */
export const handler = (action: ControllerMethod) => async (request: Request, response: Response, next: NextFunction) => {
  try {
    return await action(request, response);
  }
  catch(error) {
    return response.status(500).json({error: error.message}) && next(error);
  }
};

/**
 * Apply known routes to the router
 *
 * @param router
 */
const applyRoutes = (router: Router) => {
  router.get('/pages', handler(pageController.index));
  router.get('/pages/:id', handler(pageController.show));
};
export default applyRoutes;