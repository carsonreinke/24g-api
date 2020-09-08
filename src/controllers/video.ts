import { ControllerMethod, all as _all, show as _show, respond400 } from './general';
import { loadAll, load, loadByPage, incrementViews, incrementVote } from '../services/video';

export const index: ControllerMethod = async (request, response) => {
  let pageId = request.query.pageId;
  if (Array.isArray(pageId)) {
    pageId = pageId[0];
    return respond400('Cannot filter on array');
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

export const vote: ControllerMethod = async (request, response) => {
  let up = true;
  switch(request.params.vote) {
    case 'thumbs-up':
      up = true;
      break;
    case 'thumbs-down':
      up = false;
      break;
    default:
      return respond400(`Invalid vote type "${request.params.vote}"`);
  }

  const video = await load(parseInt(request.params.id));
  await incrementVote(video, up);

  return response.status(201).end();
}