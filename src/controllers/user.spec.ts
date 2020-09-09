import request from 'supertest';
import * as userServices from '../services/user';
import app from '../server';
import { User } from '../models/user';
import { mocked } from 'ts-jest/utils'

jest.mock('../services/user');

const mockedUserServices = mocked(userServices, true);

describe('show', () => {
  it('should return a page', async () => {
    const data = new User();
    data.id = 1;
    data.firstName = 'First Name';
    data.lastName = 'Last Name';
    mockedUserServices.load.mockResolvedValue(data);

    const response = await request(await app()).get('/users/1').send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ id: data.id, firstName: data.firstName, lastName: data.lastName });
  });
});