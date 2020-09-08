import { ControllerMethod, all as _all, show as _show } from './general';
import { loadAll, load, loadByPage, incrementViews } from '../services/video';

export const index: ControllerMethod = async (request, response) => {
  let pageId = request.query.pageId;
  if (Array.isArray(pageId)) {
    pageId = pageId[0];
    return response.status(400).json({error: 'Cannot filter on array'});
  }

  // Allow filtering by page
  let method = loadAll;
  if (pageId) {
    method = loadByPage.bind(this, pageId);
  }

  return _all(request, response, method);
};

export const show: ControllerMethod = async (request, response) => {
  return _show(request, response, load, async (video) => {
    await incrementViews(video)
  });
};