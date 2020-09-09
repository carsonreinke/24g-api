import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../models/user';
import { save } from '../services/user';

export class SeedUser1599610943033 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await Promise.all([
      {
        firstName: 'David',
        lastName: 'Jakowenko'
      },
      {
        firstName: 'Lisa',
        lastName: 'Wadenstorer'
      },
      {
        firstName: 'Scott',
        lastName: 'Wiemels'
      }
    ].map(async (data) => {
      const user = new User();
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      return await save(user);
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // No-op
  }
}
