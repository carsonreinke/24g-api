import { connection } from './connection';
import { Video } from '../models/video';
import { Repository } from 'typeorm';
import { LoadAllServiceMethod, LoadServiceMethod, LoadFilteredServiceMethod } from './general';
import { Measurement } from '../models/measurement';

const repository = async (): Promise<Repository<Video>> => {
  return (await connection()).getRepository(Video);
};

export const loadAll: LoadAllServiceMethod<Video> = async () => {
  return (await repository()).find();
};

export const load: LoadServiceMethod<Video> = async (id) => {
  return (await repository()).findOne(id);
};

export const loadByPage: LoadFilteredServiceMethod<Video> = async (pageId) => {
  return (await repository()).find({
    where: { pageId }
  });
};

const saveMeasurement = async (measurement: Measurement): Promise<Measurement> => {
  return (await connection()).getRepository(Measurement).save(measurement);
};

export const save = async (video: Video): Promise<Video> => {
  const saved = await (await repository()).save(video);

  // We want to ensure we always have this measurement
  if (!saved.measurement) {
    saved.measurement = new Measurement();
  }
  saved.measurement = await saveMeasurement(saved.measurement);

  return saved;
};

const incrementMeasurement = async (video: Video, column: string): Promise<void> => {
  await (await connection()).transaction(async (entityManager) => {
    entityManager.increment(Measurement, video.id, column, 1);
  });
}

export const incrementViews = async (video: Video): Promise<void> => {
  return incrementMeasurement(video, 'views');
}

export const incrementVote = async (video: Video, up: boolean = true): Promise<void> => {
  return incrementMeasurement(video, up ? 'thumbsUp' : 'thumbsDown');
}