import { MigrationInterface, QueryRunner } from 'typeorm';
import { Video } from '../models/video';
import { loadAll } from '../services/page';
import { save } from '../services/video';

export class SeedVideo1599598796966 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const pages = await loadAll();
    const page = pages[0];
    if (!page) {
      throw new Error('Missing page to add videos to');
    }

    await Promise.all([
      {
        'title': 'Who is 24G?',
        'video': 'https://static-email-hosting.s3.amazonaws.com/24G_Test_Project/videos/who_is_24g.mp4',
        'thumb': 'https://static-email-hosting.s3.amazonaws.com/24G_Test_Project/videos/who_is_24g.jpg'
      },
      {
        'title': 'CES Overview',
        'video': 'https://static-email-hosting.s3.amazonaws.com/24G_Test_Project/videos/ces_overview.mp4',
        'thumb': 'https://static-email-hosting.s3.amazonaws.com/24G_Test_Project/videos/ces_overview.jpg'
      },
      {
        'title': 'Future of Drones',
        'video': 'https://static-email-hosting.s3.amazonaws.com/24G_Test_Project/videos/future_of_drones.mp4',
        'thumb': 'https://static-email-hosting.s3.amazonaws.com/24G_Test_Project/videos/future_of_drones.jpg'
      }
    ].map(async (data) => {
      const video = new Video();
      video.page = page;
      video.title = data.title;
      video.uri = data.video;
      video.thumbnail = data.thumb;
      return await save(video);
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // No-op
  }
}