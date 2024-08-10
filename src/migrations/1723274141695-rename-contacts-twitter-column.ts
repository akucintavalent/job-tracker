import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameContactsTwitterColumn1723274141695 implements MigrationInterface {
  name = 'RenameContactsTwitterColumn1723274141695';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "contacts" RENAME COLUMN "twiter_url" TO "twitter_url"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "contacts" RENAME COLUMN "twitter_url" TO "twiter_url"`);
  }
}
