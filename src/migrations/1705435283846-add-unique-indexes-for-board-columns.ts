import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueIndexesForBoardColumns1705435283846
  implements MigrationInterface
{
  name = 'AddUniqueIndexesForBoardColumns1705435283846';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "board_columns" DROP CONSTRAINT "FK_7273aeaf89e8a49215e4d0e5147"`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_columns" ADD CONSTRAINT "UN_ORDER_PER_BOARD" UNIQUE ("board_id", "order")`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_columns" ADD CONSTRAINT "UN_NAME_PER_BOARD" UNIQUE ("board_id", "name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_columns" ADD CONSTRAINT "FK_55e6772f5b84a2fb358db473313" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "board_columns" DROP CONSTRAINT "FK_55e6772f5b84a2fb358db473313"`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_columns" DROP CONSTRAINT "UN_NAME_PER_BOARD"`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_columns" DROP CONSTRAINT "UN_ORDER_PER_BOARD"`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_columns" ADD CONSTRAINT "FK_7273aeaf89e8a49215e4d0e5147" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
