import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJoinReqTable1683032791896 implements MigrationInterface {
  name = 'CreateJoinReqTable1683032791896';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "join_request" ("id" SERIAL NOT NULL, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "associationId" integer, CONSTRAINT "PK_ea4ce3bfd1dcd38029f3176bb4e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "join_request" ADD CONSTRAINT "FK_04fd9561fde2db761df5777092c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "join_request" ADD CONSTRAINT "FK_b5d2d1e3e1aa4d09eec1bb52e58" FOREIGN KEY ("associationId") REFERENCES "association"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "join_request" DROP CONSTRAINT "FK_b5d2d1e3e1aa4d09eec1bb52e58"`,
    );
    await queryRunner.query(
      `ALTER TABLE "join_request" DROP CONSTRAINT "FK_04fd9561fde2db761df5777092c"`,
    );
    await queryRunner.query(`DROP TABLE "join_request"`);
  }
}
