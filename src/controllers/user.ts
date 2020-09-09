import { ControllerMethod, all as _all, show as _show } from './general';
import { load } from '../services/user';

export const show: ControllerMethod = async (request, response) => {
  return _show(request, response, load);
};