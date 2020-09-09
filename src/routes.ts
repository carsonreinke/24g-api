import { Router, Request, Response, NextFunction } from 'express';
import * as pageController from './controllers/page';
import * as videoController from './controllers/video';
import * as userController from './controllers/user';
import * as commentController from './controllers/comment';
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
  catch (error) {
    return response.status(500).json({ error: error.message }) && next(error);
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
  router.get('/videos', handler(videoController.index));
  router.get('/videos/:id', handler(videoController.show));
  router.put('/videos/:id/vote/:vote', handler(videoController.vote));
  router.get('/users/:id', handler(userController.show));
  router.get('/comments', handler(commentController.index));
  router.post('/comments', handler(commentController.create));
};
export default applyRoutes;