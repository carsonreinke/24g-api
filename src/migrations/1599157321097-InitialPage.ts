import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class InitialPage1599157321097 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'page',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'title',
          type: 'varchar',
        },
        {
          name: 'path',
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
    await queryRunner.dropTable('page', false);
  }

}
