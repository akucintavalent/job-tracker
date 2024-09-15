import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCompaniesTable1726419363531 implements MigrationInterface {
  name = 'CreateCompaniesTable1726419363531';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "companies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "description" character varying, "url" character varying, "industry" character varying, "job_application_id" uuid, CONSTRAINT "REL_0123b76ca96efa233c78f87d1e" UNIQUE ("job_application_id"), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "job_applications" ADD "company_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "job_applications" ADD CONSTRAINT "UQ_4bf4f05ce72bb2a329d87861942" UNIQUE ("company_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "companies" ADD CONSTRAINT "FK_0123b76ca96efa233c78f87d1ec" FOREIGN KEY ("job_application_id") REFERENCES "job_applications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_applications" ADD CONSTRAINT "FK_4bf4f05ce72bb2a329d87861942" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "job_applications" DROP CONSTRAINT "FK_4bf4f05ce72bb2a329d87861942"`,
    );
    await queryRunner.query(
      `ALTER TABLE "companies" DROP CONSTRAINT "FK_0123b76ca96efa233c78f87d1ec"`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_applications" DROP CONSTRAINT "UQ_4bf4f05ce72bb2a329d87861942"`,
    );
    await queryRunner.query(`ALTER TABLE "job_applications" DROP COLUMN "company_id"`);
    await queryRunner.query(`DROP TABLE "companies"`);
  }
}
