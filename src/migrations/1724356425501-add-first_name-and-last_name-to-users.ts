import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFirstNameAndLastNameToUsers1724356425501 implements MigrationInterface {
  name = 'AddFirstNameAndLastNameToUsers1724356425501';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "first_name" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" ADD "last_name" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TYPE "public"."user_code_verifications_process_enum" RENAME TO "user_code_verifications_process_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_code_verifications_process_enum" AS ENUM('USER_SIGNUP', 'USER_DELETE')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_code_verifications" ALTER COLUMN "process" TYPE "public"."user_code_verifications_process_enum" USING "process"::"text"::"public"."user_code_verifications_process_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."user_code_verifications_process_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_code_verifications_process_enum_old" AS ENUM('USER_SIGNUP', 'USER_DELETE', 'USER_RESET_PASSWORD')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_code_verifications" ALTER COLUMN "process" TYPE "public"."user_code_verifications_process_enum_old" USING "process"::"text"::"public"."user_code_verifications_process_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."user_code_verifications_process_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."user_code_verifications_process_enum_old" RENAME TO "user_code_verifications_process_enum"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_name"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "first_name"`);
  }
}
