import { Request, Response } from 'express';
import { LoadAllServiceMethod, LoadServiceMethod } from '../services/general';

export type ControllerMethod = (request: Request, response: Response) => Promise<Response>;

export const all: <T>(request: Request, response: Response, service: LoadAllServiceMethod<T>, callback?: (objs: T[]) => Promise<void>) => Promise<Response> = async (_, response, service, callback) => {
  const data = await service();
  if (callback) {
    await callback(data);
  }
  return response.status(200).json(data);
};

export const show: <T>(request: Request, response: Response, service: LoadServiceMethod<T>, callback?: (obj: T) => Promise<void>) => Promise<Response> = async (request, response, service, callback) => {
  const id = request.params.id;
  const data = await service(parseInt(request.params.id)); // TODO
  if (data) {
    if (callback) {
      await callback(data);
    }
    return response.status(200).json(data);
  }
  return response.status(404).json({
    error: `Not found with identifier "${id}"`
  });
};