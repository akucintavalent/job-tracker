import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExpandJobApplicationsAndCreateCompanies1726419026306 implements MigrationInterface {
  name = 'ExpandJobApplicationsAndCreateCompanies1726419026306';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "job_applications" DROP COLUMN "company_name"`);
    await queryRunner.query(`ALTER TABLE "job_applications" ADD "post_url" character varying`);
    await queryRunner.query(`ALTER TABLE "job_applications" ADD "salary" character varying`);
    await queryRunner.query(`ALTER TABLE "job_applications" ADD "location" character varying`);
    await queryRunner.query(`ALTER TABLE "job_applications" ADD "color" character varying`);
    await queryRunner.query(`ALTER TABLE "job_applications" ADD "deadline" date`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "job_applications" DROP COLUMN "deadline"`);
    await queryRunner.query(`ALTER TABLE "job_applications" DROP COLUMN "color"`);
    await queryRunner.query(`ALTER TABLE "job_applications" DROP COLUMN "location"`);
    await queryRunner.query(`ALTER TABLE "job_applications" DROP COLUMN "salary"`);
    await queryRunner.query(`ALTER TABLE "job_applications" DROP COLUMN "post_url"`);
    await queryRunner.query(
      `ALTER TABLE "job_applications" ADD "company_name" character varying NOT NULL`,
    );
  }
}
