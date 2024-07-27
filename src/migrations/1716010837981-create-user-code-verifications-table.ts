import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserCodeVerification1716010837981 implements MigrationInterface {
  name = 'AddUserCodeVerification1716010837981';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "job-applications" DROP CONSTRAINT "FK_aab9468826ce4e79ae4487feb32"`,
    );
    await queryRunner.query(
      `CREATE TABLE "user-code-verifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid, CONSTRAINT "PK_a9799011471889ad054f21edd09" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "job-applications" ADD CONSTRAINT "FK_e71a12ccd5cffef2ad6b1fd7d83" FOREIGN KEY ("column_id") REFERENCES "board_columns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-code-verifications" ADD CONSTRAINT "FK_722a782913fb9b3acc556d0c0a2" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user-code-verifications" DROP CONSTRAINT "FK_722a782913fb9b3acc556d0c0a2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "job-applications" DROP CONSTRAINT "FK_e71a12ccd5cffef2ad6b1fd7d83"`,
    );
    await queryRunner.query(`DROP TABLE "user-code-verifications"`);
    await queryRunner.query(
      `ALTER TABLE "job-applications" ADD CONSTRAINT "FK_aab9468826ce4e79ae4487feb32" FOREIGN KEY ("column_id") REFERENCES "board_columns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
