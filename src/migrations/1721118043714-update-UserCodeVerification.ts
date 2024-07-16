import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserCodeVerification1721118043714 implements MigrationInterface {
  name = 'UpdateUserCodeVerification1721118043714';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_code_verifications_process_enum" AS ENUM('USER_SIGNUP', 'USER_DELETE')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_code_verifications" ADD "process" "public"."user_code_verifications_process_enum" NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_code_verifications" DROP COLUMN "process"`);
    await queryRunner.query(`DROP TYPE "public"."user_code_verifications_process_enum"`);
  }
}
