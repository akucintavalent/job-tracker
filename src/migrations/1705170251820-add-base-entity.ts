import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBaseEntity1705170251820 implements MigrationInterface {
  name = 'AddBaseEntity1705170251820';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "boards" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "boards" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "boards" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "boards" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "boards" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "boards" DROP COLUMN "created_at"`);
  }
}
