import { Request, Response } from 'express';
import { LoadAllServiceMethod, LoadServiceMethod } from '../services/general';

export type ControllerMethod = (request: Request, response: Response) => Promise<Response>;

export const respond200 = (response: Response, data): Response => {
  return response.status(200).json(data);
};
const respondError = (statusCode: number = 500, response: Response, error: string): Response => {
  return response.status(statusCode).json({error});
};
export const respond400 = respondError.bind(this, 400);
export const respond404 = respondError.bind(this, 404);
export const respond500 = respondError.bind(this, 500);

export const all: <T>(request: Request, response: Response, service: LoadAllServiceMethod<T>, callback?: (objs: T[]) => Promise<void>) => Promise<Response> = async (_, response, service, callback) => {
  const data = await service();
  if (callback) {
    await callback(data);
  }
  return respond200(response, data);
};

export const show: <T>(request: Request, response: Response, service: LoadServiceMethod<T>, callback?: (obj: T) => Promise<void>) => Promise<Response> = async (request, response, service, callback) => {
  const id = request.params.id;
  const data = await service(parseInt(request.params.id)); // TODO
  if (data) {
    if (callback) {
      await callback(data);
    }
    return respond200(response, data);
  }
  return respond404(response, `Not found with identifier "${id}"`);
};