import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameIsEmailVerifiedColumn1718431598688 implements MigrationInterface {
  name = 'RenameIsEmailVerifiedColumn1718431598688';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "is-email-verified" TO "is_email_verified"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "is_email_verified" TO "is-email-verified"`,
    );
  }
}
