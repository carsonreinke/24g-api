import { connection } from './connection';
import { Comment } from '../models/comment';
import { Repository } from 'typeorm';
import { LoadAllServiceMethod, LoadFilteredServiceMethod } from './general';

const repository = async (): Promise<Repository<Comment>> => {
  return (await connection()).getRepository(Comment);
};

export const loadAll: LoadAllServiceMethod<Comment> = async () => {
  return (await repository()).find();
};

export const loadByVideo: LoadFilteredServiceMethod<Comment> = async (videoId) => {
  return (await repository()).find({
    where: { videoId }
  });
};

export async function save(comment: Comment): Promise<Comment> {
  return (await repository()).save(comment);
}