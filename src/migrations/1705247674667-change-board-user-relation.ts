import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeBoardUserRelation1705247674667 implements MigrationInterface {
  name = 'ChangeBoardUserRelation1705247674667';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "boards" DROP CONSTRAINT "FK_a235c3aff3d3d4b91eaa3a7c338"`,
    );
    await queryRunner.query(
      `ALTER TABLE "boards" DROP CONSTRAINT "REL_a235c3aff3d3d4b91eaa3a7c33"`,
    );
    await queryRunner.query(
      `ALTER TABLE "boards" ADD CONSTRAINT "FK_a235c3aff3d3d4b91eaa3a7c338" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "boards" DROP CONSTRAINT "FK_a235c3aff3d3d4b91eaa3a7c338"`,
    );
    await queryRunner.query(
      `ALTER TABLE "boards" ADD CONSTRAINT "REL_a235c3aff3d3d4b91eaa3a7c33" UNIQUE ("user_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "boards" ADD CONSTRAINT "FK_a235c3aff3d3d4b91eaa3a7c338" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
