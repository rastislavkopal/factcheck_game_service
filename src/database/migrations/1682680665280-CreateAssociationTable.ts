import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAssociationTable1682680665280 implements MigrationInterface {
  name = 'CreateAssociationTable1682680665280';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "association" ("id" SERIAL NOT NULL, "shortTitle" character varying NOT NULL, "title" character varying, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_29e338e076c91e9dbc417a9db63" UNIQUE ("shortTitle"), CONSTRAINT "PK_5c770cfef7a1f66da23be411699" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "associationId" integer`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_72a26c7d9fb2a68bec390c4b130" FOREIGN KEY ("associationId") REFERENCES "association"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_29e338e076c91e9dbc417a9db6" ON "association" ("shortTitle") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e24e7e2da4ece1feaeaab3b7d7" ON "association" ("title") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_72a26c7d9fb2a68bec390c4b130"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e24e7e2da4ece1feaeaab3b7d7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_29e338e076c91e9dbc417a9db6"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "associationId"`);
    await queryRunner.query(`DROP TABLE "association"`);
  }
}
