import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetCascadeDelete1721316693082 implements MigrationInterface {
  name = 'SetCascadeDelete1721316693082';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contacts" DROP CONSTRAINT "FK_4d31bfcbce0320d8e79ad6ccff9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_applications" DROP CONSTRAINT "FK_13280af164c9576706a31408fbe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_columns" DROP CONSTRAINT "FK_55e6772f5b84a2fb358db473313"`,
    );
    await queryRunner.query(
      `ALTER TABLE "boards" DROP CONSTRAINT "FK_a235c3aff3d3d4b91eaa3a7c338"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_code_verifications" DROP CONSTRAINT "FK_c5633e22d389433d25f7c6d0ebe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts_job_applications_job_applications" DROP CONSTRAINT "FK_1d3a3e1714dd782838833f91ae9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD CONSTRAINT "FK_4d31bfcbce0320d8e79ad6ccff9" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_applications" ADD CONSTRAINT "FK_13280af164c9576706a31408fbe" FOREIGN KEY ("column_id") REFERENCES "board_columns"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_columns" ADD CONSTRAINT "FK_55e6772f5b84a2fb358db473313" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "boards" ADD CONSTRAINT "FK_a235c3aff3d3d4b91eaa3a7c338" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_code_verifications" ADD CONSTRAINT "FK_c5633e22d389433d25f7c6d0ebe" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts_job_applications_job_applications" ADD CONSTRAINT "FK_1d3a3e1714dd782838833f91ae9" FOREIGN KEY ("jobApplicationsId") REFERENCES "job_applications"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contacts_job_applications_job_applications" DROP CONSTRAINT "FK_1d3a3e1714dd782838833f91ae9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_code_verifications" DROP CONSTRAINT "FK_c5633e22d389433d25f7c6d0ebe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "boards" DROP CONSTRAINT "FK_a235c3aff3d3d4b91eaa3a7c338"`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_columns" DROP CONSTRAINT "FK_55e6772f5b84a2fb358db473313"`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_applications" DROP CONSTRAINT "FK_13280af164c9576706a31408fbe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" DROP CONSTRAINT "FK_4d31bfcbce0320d8e79ad6ccff9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts_job_applications_job_applications" ADD CONSTRAINT "FK_1d3a3e1714dd782838833f91ae9" FOREIGN KEY ("jobApplicationsId") REFERENCES "job_applications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_code_verifications" ADD CONSTRAINT "FK_c5633e22d389433d25f7c6d0ebe" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "boards" ADD CONSTRAINT "FK_a235c3aff3d3d4b91eaa3a7c338" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "board_columns" ADD CONSTRAINT "FK_55e6772f5b84a2fb358db473313" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "job_applications" ADD CONSTRAINT "FK_13280af164c9576706a31408fbe" FOREIGN KEY ("column_id") REFERENCES "board_columns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD CONSTRAINT "FK_4d31bfcbce0320d8e79ad6ccff9" FOREIGN KEY ("board_id") REFERENCES "boards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
