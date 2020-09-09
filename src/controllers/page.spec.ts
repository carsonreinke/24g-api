import request from 'supertest';
import * as pageServices from '../services/page';
import app from '../server';
import { Page } from '../models/page';
import { mocked } from 'ts-jest/utils'

jest.mock('../services/page');

const mockedPageServices = mocked(pageServices, true);

describe('all', () => {
  it('should return all pages', async () => {
    const data = new Page();
    data.title = 'Testing';
    mockedPageServices.loadAll.mockResolvedValue([
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
    mockedPageServices.load.mockResolvedValue(data);

    const response = await request(await app()).get('/pages/1').send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ id: data.id, title: data.title });
  });
});