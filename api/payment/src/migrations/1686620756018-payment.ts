import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Payment1686620756018 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'payment',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'order_id',
            type: 'int',
          },
          {
            name: 'status',
            type: 'tinyInt',
            default: 0,
          },
          {
            name: 'price_total',
            type: 'int',
            default: 0,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('payment');
  }
}
