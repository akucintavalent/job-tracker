import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateContactTable1717312329645 implements MigrationInterface {
  name = 'CreateContactTable1717312329645';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "job_title" character varying NOT NULL, "company_name" character varying, "company_location" character varying, "twiter_url" character varying, "facebook_url" character varying, "linkedin_url" character varying, "github_url" character varying, "comment" character varying, "board_id" uuid NOT NULL, CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "contacts_job_applications_job-applications" ("contactsId" uuid NOT NULL, "jobApplicationsId" uuid NOT NULL, CONSTRAINT "PK_020bfef3fd6ac20f3878f6843fa" PRIMARY KEY ("contactsId", "jobApplicationsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6801319887329223ab5cd33f99" ON "contacts_job_applications_job-applications" ("contactsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d7c645da4256ca9cbb38f5d52b" ON "contacts_job_applications_job-applications" ("jobApplicationsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD CONSTRAINT "FK_4d31bfcbce0320d8e79ad6ccff9" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts_job_applications_job-applications" ADD CONSTRAINT "FK_6801319887329223ab5cd33f99c" FOREIGN KEY ("contactsId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts_job_applications_job-applications" ADD CONSTRAINT "FK_d7c645da4256ca9cbb38f5d52b6" FOREIGN KEY ("jobApplicationsId") REFERENCES "job-applications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contacts_job_applications_job-applications" DROP CONSTRAINT "FK_d7c645da4256ca9cbb38f5d52b6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts_job_applications_job-applications" DROP CONSTRAINT "FK_6801319887329223ab5cd33f99c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" DROP CONSTRAINT "FK_4d31bfcbce0320d8e79ad6ccff9"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_d7c645da4256ca9cbb38f5d52b"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_6801319887329223ab5cd33f99"`);
    await queryRunner.query(`DROP TABLE "contacts_job_applications_job-applications"`);
    await queryRunner.query(`DROP TABLE "contacts"`);
  }
}
