import { Request, Response } from 'express';
import { LoadAllServiceMethod, LoadServiceMethod } from '../services/general';

export type ControllerMethod = (request: Request, response: Response) => Promise<Response>;

export const all: <T>(request: Request, response: Response, service: LoadAllServiceMethod<T>) => Promise<Response> = async (_, response, service) => {
  return response.status(200).json(await service());
};

export const show: <T>(request: Request, response: Response, service: LoadServiceMethod<T>) => Promise<Response> = async (request, response, service) => {
  const id = request.params.id;
  const data = await service(parseInt(request.params.id)); // TODO
  if(data) {
    return response.status(200).json(data);
  }
  return response.status(404).json({
    error: `Not found with identifier "${id}"`
  });
};