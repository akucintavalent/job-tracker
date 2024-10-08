import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangesToJobApplications1728408271117 implements MigrationInterface {
  name = 'ChangesToJobApplications1728408271117';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "job_applications" DROP CONSTRAINT "FK_4bf4f05ce72bb2a329d87861942"`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_applications" ADD CONSTRAINT "FK_4bf4f05ce72bb2a329d87861942" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "job_applications" DROP CONSTRAINT "FK_4bf4f05ce72bb2a329d87861942"`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_applications" ADD CONSTRAINT "FK_4bf4f05ce72bb2a329d87861942" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
