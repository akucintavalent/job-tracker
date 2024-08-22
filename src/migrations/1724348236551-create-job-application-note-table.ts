import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJobApplicationNoteTable1724348236551 implements MigrationInterface {
  name = 'CreateJobApplicationNoteTable1724348236551';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "job_application_notes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "content" character varying, "order" integer NOT NULL, "job_application_id" uuid, CONSTRAINT "PK_fab58ad6e93644f2cf765b41d42" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_application_notes" ADD CONSTRAINT "FK_77e6788bfb56d8bfe045377cc19" FOREIGN KEY ("job_application_id") REFERENCES "job_applications"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "job_application_notes" DROP CONSTRAINT "FK_77e6788bfb56d8bfe045377cc19"`,
    );
    await queryRunner.query(`DROP TABLE "job_application_notes"`);
  }
}
