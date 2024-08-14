import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddContactMethodType1723407937990 implements MigrationInterface {
  name = 'AddContactMethodType1723407937990';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "contact-emails" ADD "type" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "contact-phones" ADD "type" character varying NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "contact-phones" DROP COLUMN "type"`);
    await queryRunner.query(`ALTER TABLE "contact-emails" DROP COLUMN "type"`);
  }
}
