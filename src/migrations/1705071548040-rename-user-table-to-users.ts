import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameUserTableToUsers1705071548040 implements MigrationInterface {
  name = 'RenameUserTableToUsers1705071548040';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('user', 'users');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable('users', 'user');
  }
}
