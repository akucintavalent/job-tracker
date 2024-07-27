import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserCodeVerification1716018153188 implements MigrationInterface {
  name = 'UpdateUserCodeVerification1716018153188';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user-code-verifications" ADD "code" character varying(6) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user-code-verifications" DROP COLUMN "code"`);
  }
}
