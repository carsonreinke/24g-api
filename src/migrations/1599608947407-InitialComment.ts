import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class InitialComment1599608947407 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'comment',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'userId',
          type: 'integer',
        },
        {
          name: 'videoId',
          type: 'integer',
        },
        {
          name: 'text',
          type: 'text'
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
    await queryRunner.createForeignKey('comment', new TableForeignKey({
      columnNames: ['videoId'],
      referencedTableName: 'video',
      referencedColumnNames: ['id']
    }));
    await queryRunner.createForeignKey('comment', new TableForeignKey({
      columnNames: ['userId'],
      referencedTableName: 'user',
      referencedColumnNames: ['id']
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('comment', false);
  }
}
