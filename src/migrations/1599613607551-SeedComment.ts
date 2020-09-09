import { MigrationInterface, QueryRunner } from 'typeorm';
import { loadAll as videoLoadAll } from '../services/video';
import { loadAll as userLoadAll } from '../services/user';
import { save } from '../services/comment';
import { Comment } from '../models/comment';
import { loremIpsum } from 'lorem-ipsum';

export class SeedComment1599613607551 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const videos = await videoLoadAll();
    const video = videos[0];
    if (!video) {
      throw new Error('Missing video to add comments to');
    }

    const users = await userLoadAll();

    await Promise.all(users.map(async (user) => {
      const comment = new Comment();
      comment.user = user;
      comment.video = video;
      comment.text = loremIpsum({ count: 3 });
      return await save(comment);
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // No-op
  }
}
