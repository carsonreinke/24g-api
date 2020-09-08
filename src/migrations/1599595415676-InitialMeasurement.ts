import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class InitialMeasurement1599595415676 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'measurement',
      columns: [
        {
          name: 'videoId',
          type: 'integer',
          isPrimary: true,
          isGenerated: false
        },
        {
          name: 'views',
          type: 'integer',
          default: 0
        },
        {
          name: 'thumbsUp',
          type: 'integer',
          default: 0
        },
        {
          name: 'thumbsDown',
          type: 'integer',
          default: 0
        }
      ]
    }), false);
    await queryRunner.createForeignKey('measurement', new TableForeignKey({
      columnNames: ['videoId'],
      referencedTableName: 'video',
      referencedColumnNames: ['id']
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('measurement', false);
  }
}
