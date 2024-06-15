import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameJobApplicationsTable1718432862407 implements MigrationInterface {
  name = 'RenameJobApplicationsTable1718432862407';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "job_applications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "title" character varying NOT NULL, "company_name" character varying NOT NULL, "description" character varying, "column_id" uuid, CONSTRAINT "PK_c56a5e86707d0f0df18fa111280" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "contacts_job_applications_job_applications" ("contactsId" uuid NOT NULL, "jobApplicationsId" uuid NOT NULL, CONSTRAINT "PK_dfb4975a46c45c7709d172d76dd" PRIMARY KEY ("contactsId", "jobApplicationsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a2d27650ed25258790492583a6" ON "contacts_job_applications_job_applications" ("contactsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1d3a3e1714dd782838833f91ae" ON "contacts_job_applications_job_applications" ("jobApplicationsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "job_applications" ADD CONSTRAINT "FK_13280af164c9576706a31408fbe" FOREIGN KEY ("column_id") REFERENCES "board_columns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts_job_applications_job_applications" ADD CONSTRAINT "FK_a2d27650ed25258790492583a6c" FOREIGN KEY ("contactsId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts_job_applications_job_applications" ADD CONSTRAINT "FK_1d3a3e1714dd782838833f91ae9" FOREIGN KEY ("jobApplicationsId") REFERENCES "job_applications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    // Additional queries to migrate data & drop redundant TABLE
    await queryRunner.query(`INSERT INTO "job_applications" SELECT * FROM "job-applications"`);
    await queryRunner.query(
      `INSERT INTO "contacts_job_applications_job_applications" SELECT * FROM "contacts_job_applications_job-applications"`,
    );
    await queryRunner.query(
      `DROP TABLE IF EXISTS "contacts_job_applications_job-applications" CASCADE`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "job-applications" CASCADE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contacts_job_applications_job_applications" DROP CONSTRAINT "FK_1d3a3e1714dd782838833f91ae9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts_job_applications_job_applications" DROP CONSTRAINT "FK_a2d27650ed25258790492583a6c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_applications" DROP CONSTRAINT "FK_13280af164c9576706a31408fbe"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_1d3a3e1714dd782838833f91ae"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_a2d27650ed25258790492583a6"`);
    await queryRunner.query(`DROP TABLE "contacts_job_applications_job_applications"`);
    await queryRunner.query(`DROP TABLE "job_applications"`);
  }
}
