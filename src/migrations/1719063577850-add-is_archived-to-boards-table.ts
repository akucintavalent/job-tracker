import { MigrationInterface, QueryRunner } from 'typeorm';

export class IsArchivedBoard1719063577850 implements MigrationInterface {
  name = 'IsArchivedBoard1719063577850';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "boards" ADD "is_archived" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "boards" DROP COLUMN "is_archived"`);
  }
}
