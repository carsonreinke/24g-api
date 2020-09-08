import { connection } from './connection';
import { Page } from '../models/page';
import { Repository } from 'typeorm';
import { LoadAllServiceMethod, LoadServiceMethod } from './general';

async function repository(): Promise<Repository<Page>> {
  return (await connection()).getRepository(Page)
}

export const loadAll: LoadAllServiceMethod<Page> = async () => {
  return (await repository()).find();
}

export const load: LoadServiceMethod<Page> = async (id) => {
  return (await repository()).findOne(id);
}

export async function save(page: Page): Promise<Page> {
  return (await repository()).save(page);
}