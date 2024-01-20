import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveUNORDERPERBOARD1705584144247 implements MigrationInterface {
  name = 'RemoveUNORDERPERBOARD1705584144247';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "board_columns" DROP CONSTRAINT "UN_ORDER_PER_BOARD"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "board_columns" ADD CONSTRAINT "UN_ORDER_PER_BOARD" UNIQUE ("order", "board_id")`,
    );
  }
}
