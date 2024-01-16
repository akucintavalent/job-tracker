import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBoardColumnsTable1705396987716 implements MigrationInterface {
  name = 'AddBoardColumnsTable1705396987716';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "board-columns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "order" integer NOT NULL, "board_id" uuid, CONSTRAINT "PK_c8d8f7690d5c6eb968d16abbb55" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "board-columns" ADD CONSTRAINT "FK_7273aeaf89e8a49215e4d0e5147" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "board-columns" DROP CONSTRAINT "FK_7273aeaf89e8a49215e4d0e5147"`,
    );
    await queryRunner.query(`DROP TABLE "board-columns"`);
  }
}
