import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFirstNameAndLastNameToUsers1724398380351 implements MigrationInterface {
  name = 'AddFirstNameAndLastNameToUsers1724398380351';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "first_name" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" ADD "last_name" character varying NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_name"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "first_name"`);
  }
}
