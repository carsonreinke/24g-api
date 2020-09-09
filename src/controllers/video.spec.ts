import request from 'supertest';
import * as videoServices from '../services/video';
import app from '../server';
import { Video } from '../models/video';
import { mocked } from 'ts-jest/utils'

jest.mock('../services/video');

const mockedVideoServices = mocked(videoServices, true);

describe('all', () => {
  it('should return all videos', async () => {
    const data = new Video();
    data.title = 'Testing';
    mockedVideoServices.loadAll.mockResolvedValue([
      data
    ]);

    const response = await request(await app()).get('/videos').send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual([{ title: data.title }]);
  });

  it('should return videos for specific page', async () => {
    const data = new Video();
    data.title = 'Video Awesome';
    mockedVideoServices.loadByPage.mockResolvedValue([
      data
    ]);

    const response = await request(await app()).get('/videos?pageId=1').send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual([{ title: data.title }]);
  });
});

describe('show', () => {
  it('should return a video', async () => {
    const data = new Video();
    data.id = 1;
    data.title = 'Testing';
    mockedVideoServices.load.mockResolvedValue(data);

    const response = await request(await app()).get('/videos/1').send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ id: data.id, title: data.title });
  });

  it('should increment views', async () => {
    const data = new Video();
    mockedVideoServices.load.mockResolvedValue(data);

    const response = await request(await app()).get('/videos/1').send();

    expect(mockedVideoServices.incrementViews).toHaveBeenCalled();
  });
});

describe('vote', () => {
  ['up', 'down'].forEach((direction) => {
    it(`should increment thumb ${direction}`, async () => {
      const data = new Video();
      mockedVideoServices.load.mockResolvedValue(data);
      mockedVideoServices.incrementVote.mockResolvedValue(null);

      const response = await request(await app()).put(`/videos/1/vote/thumbs-${direction}`).send();

      expect(response.status).toEqual(201);
      expect(mockedVideoServices.incrementVote).toHaveBeenCalledWith(data, direction === 'up');
    });
  });
});