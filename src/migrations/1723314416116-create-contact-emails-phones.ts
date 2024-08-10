import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateContactEmailsPhones1723314416116 implements MigrationInterface {
  name = 'CreateContactEmailsPhones1723314416116';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "contact-emails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "email" character varying NOT NULL, "contact_id" uuid NOT NULL, CONSTRAINT "PK_a22ececd7b4519a26d788e2ce29" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "contact-phones" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "phone" character varying(16) NOT NULL, "contact_id" uuid NOT NULL, CONSTRAINT "PK_330d10ed4a51dd59d4f7233bb27" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-emails" ADD CONSTRAINT "FK_081dba9cbb2eacf192799fd2c45" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-phones" ADD CONSTRAINT "FK_c3138a27caa008dcb47e6192ec9" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contact-phones" DROP CONSTRAINT "FK_c3138a27caa008dcb47e6192ec9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact-emails" DROP CONSTRAINT "FK_081dba9cbb2eacf192799fd2c45"`,
    );
    await queryRunner.query(`DROP TABLE "contact-phones"`);
    await queryRunner.query(`DROP TABLE "contact-emails"`);
  }
}
