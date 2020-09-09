import request from 'supertest';
import * as commentServices from '../services/comment';
import * as userServices from '../services/user';
import * as videoServices from '../services/video';
import app from '../server';
import { Comment } from '../models/comment';
import { mocked } from 'ts-jest/utils'
import { User } from '../models/user';
import { Video } from '../models/video';

jest.mock('../services/comment');
jest.mock('../services/user');
jest.mock('../services/video');

const mockedCommentServices = mocked(commentServices, true);
const mockedUserServices = mocked(userServices, true);
const mockedVideoServices = mocked(videoServices, true);

describe('all', () => {
  it('should return all comments', async () => {
    const data = new Comment();
    data.text = 'Testing';
    mockedCommentServices.loadAll.mockResolvedValue([
      data
    ]);

    const response = await request(await app()).get('/comments').send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual([{ text: data.text }]);
  });

  it('should return comments for specific video', async () => {
    const data = new Comment();
    data.text = 'Video Awesome';
    mockedCommentServices.loadByVideo.mockResolvedValue([
      data
    ]);

    const response = await request(await app()).get('/comments?videoId=1').send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual([{ text: data.text }]);
  });
});

describe('create', () => {
  it('should create comment', async () => {
    const user = new User();
    user.id = 1;
    const video = new Video();
    video.id = 2;
    const data = new Comment();
    data.id = 3;
    data.userId = user.id;
    data.videoId = video.id;
    data.text = 'Testing';

    mockedUserServices.load.mockResolvedValue(user);
    mockedVideoServices.load.mockResolvedValue(video);
    mockedCommentServices.save.mockResolvedValue(data);

    const response = await request(await app()).post('/comments').send({
      userId: user.id,
      videoId: video.id,
      text: data.text
    });
    
    expect(response.status).toEqual(201);
    expect(response.body).toEqual({
      id: data.id,
      userId: user.id,
      videoId: video.id,
      text: data.text,
    });
  });
});