import { ControllerMethod, all as _all, show as _show } from './general';
import { loadAll, load } from '../services/page';

export const index: ControllerMethod = async (request, response) => {
  return _all(request, response, loadAll);
};

export const show: ControllerMethod = async (request, response) => {
  return _show(request, response, load);
};