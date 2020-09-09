import { ControllerMethod, all as _all, show as _show, respond400, respond200 } from './general';
import { loadAll, loadByVideo, save } from '../services/comment';
import { load as videoLoad } from '../services/video';
import { load as userLoad } from '../services/user';

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

export const create: ControllerMethod = async (request, response) => {
  const comment = request.body;
  const video = await videoLoad(comment.videoId);
  const user = await userLoad(comment.userId);

  if (!video) {
    return respond400(response, `Invalid video identifier "${comment.videoId}"`);
  }
  if (!user) {
    return respond400(response, `Invalid user identifier "${comment.userId}"`);
  }

  const saved = await save(comment);
  return respond200(response, saved);
}