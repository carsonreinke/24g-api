import { MigrationInterface, QueryRunner } from "typeorm";
import { Page } from '../models/page';
import { save } from '../services/page';

export class SeedPage1599502211449 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const page = new Page();
    page.title = '24G Super Awesome Video';
    page.path = '/awesome';
    await save(page);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // No-op
  }
}
