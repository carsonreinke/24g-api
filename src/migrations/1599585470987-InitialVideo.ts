import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class InitialVideo1599585470987 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'video',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'pageId',
          type: 'integer'
        },
        {
          name: 'title',
          type: 'string'
        },
        {
          name: 'uri',
          type: 'varchar',
        },
        {
          name: 'thumbnail',
          type: 'varchar'
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
    await queryRunner.createForeignKey('video', new TableForeignKey({
      columnNames: ['pageId'],
      referencedTableName: 'page',
      referencedColumnNames: ['id']
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('video', false);
  }
}
