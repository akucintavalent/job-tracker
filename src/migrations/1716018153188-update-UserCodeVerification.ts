import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserCodeVerification1716018153188 implements MigrationInterface {
  name = 'UpdateUserCodeVerification1716018153188';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user-code-verifications" ADD "code" character varying(6) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "is-email-verified" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is-email-verified"`);
    await queryRunner.query(`ALTER TABLE "user-code-verifications" DROP COLUMN "code"`);
  }
}
