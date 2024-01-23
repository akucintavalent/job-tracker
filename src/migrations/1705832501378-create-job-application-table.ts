import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJobApplicationTable1705832501378 implements MigrationInterface {
  name = 'CreateJobApplicationTable1705832501378';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "job-applications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "title" character varying NOT NULL, "company_name" character varying NOT NULL, "description" character varying, "column_id" uuid, CONSTRAINT "PK_896c8c02d7da2c0228d586e54b4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "job-applications" ADD CONSTRAINT "FK_aab9468826ce4e79ae4487feb32" FOREIGN KEY ("column_id") REFERENCES "board_columns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "job-applications" DROP CONSTRAINT "FK_aab9468826ce4e79ae4487feb32"`,
    );
    await queryRunner.query(`DROP TABLE "job-applications"`);
  }
}
