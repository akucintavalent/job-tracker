import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBoardsTable1705169948120 implements MigrationInterface {
  name = 'CreateBoardsTable1705169948120';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "boards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "user_id" uuid, CONSTRAINT "REL_a235c3aff3d3d4b91eaa3a7c33" UNIQUE ("user_id"), CONSTRAINT "PK_606923b0b068ef262dfdcd18f44" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "boards" ADD CONSTRAINT "FK_a235c3aff3d3d4b91eaa3a7c338" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "boards" DROP CONSTRAINT "FK_a235c3aff3d3d4b91eaa3a7c338"`,
    );
    await queryRunner.query(`DROP TABLE "boards"`);
  }
}
