import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsEmailVerifiedField1716013114627 implements MigrationInterface {
  name = 'AddIsEmailVerifiedField1716013114627';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "is-email-verified" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is-email-verified"`);
  }
}
