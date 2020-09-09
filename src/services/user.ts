import { connection } from './connection';
import { User } from '../models/user';
import { Repository } from 'typeorm';
import { LoadAllServiceMethod, LoadServiceMethod } from './general';

async function repository(): Promise<Repository<User>> {
  return (await connection()).getRepository(User);
}

export const loadAll: LoadAllServiceMethod<User> = async () => {
  return (await repository()).find();
};

export const load: LoadServiceMethod<User> = async (id) => {
  return (await repository()).findOne(id);
}

export async function save(page: User): Promise<User> {
  return (await repository()).save(page);
}