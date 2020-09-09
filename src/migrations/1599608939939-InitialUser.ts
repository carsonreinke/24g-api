import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitialUser1599608939939 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'user',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'firstName',
          type: 'varchar',
        },
        {
          name: 'lastName',
          type: 'varchar',
        },
        {
          name: 'createdAt',
          type: 'datetime',
        },
        {
          name: 'updatedAt',
          type: 'datetime',
          isNullable: true
        }
      ]
    }), false);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user', false);
  }
}