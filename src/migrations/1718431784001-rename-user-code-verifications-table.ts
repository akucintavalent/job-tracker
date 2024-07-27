import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameUserCodeVerificationsTable1718431784001 implements MigrationInterface {
  name = 'RenameUserCodeVerificationsTable1718431784001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_code_verifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "code" character varying(6) NOT NULL, "user_id" uuid, CONSTRAINT "PK_10354c655349d0baa3a497e3cd2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_code_verifications" ADD CONSTRAINT "FK_c5633e22d389433d25f7c6d0ebe" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    // Additional query to drop redundant TABLE
    await queryRunner.query(`DROP TABLE "user-code-verifications"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_code_verifications" DROP CONSTRAINT "FK_c5633e22d389433d25f7c6d0ebe"`,
    );
    await queryRunner.query(`DROP TABLE "user_code_verifications"`);
  }
}
