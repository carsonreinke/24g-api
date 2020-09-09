import request from 'supertest';
import app from '../server';
import * as pageServices from '../services/page';
import { Page } from '../models/page';

jest.mock('../services/page');

describe('all', () => {
  it('should return all pages', async () => {
    const data = new Page();
    data.title = 'Testing';
    pageServices.loadAll.mockResolvedValue([
      data
    ]);

    const response = await request(await app()).get('/pages').send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual([{ title: data.title }]);
  });
});

describe('show', () => {
  it('should return a page', async () => {
    const data = new Page();
    data.id = 1;
    data.title = 'Testing';
    pageServices.load.mockResolvedValue(data);

    const response = await request(await app()).get('/pages/1').send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ id: data.id, title: data.title });
  });
});