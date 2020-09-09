import { ControllerMethod, all as _all, show as _show, respond400 } from './general';
import { loadAll, loadByVideo } from '../services/comment';

export const index: ControllerMethod = async (request, response) => {
  let videoId = request.query.videoId;
  if (Array.isArray(videoId)) {
    videoId = videoId[0];
    return respond400('Cannot filter on array');
  }

  // Allow filtering by page
  let method = loadAll;
  if (videoId) {
    method = loadByVideo.bind(this, videoId);
  }

  return _all(request, response, method);
};