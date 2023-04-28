import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAssociationTable1682680665280 implements MigrationInterface {
  name = 'CreateAssociationTable1682680665280';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`,
    );
    await queryRunner.query(
      `CREATE TABLE "association" ("id" SERIAL NOT NULL, "shortTitle" character varying NOT NULL, "title" character varying, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_29e338e076c91e9dbc417a9db63" UNIQUE ("shortTitle"), CONSTRAINT "PK_5c770cfef7a1f66da23be411699" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_29e338e076c91e9dbc417a9db6" ON "association" ("shortTitle") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e24e7e2da4ece1feaeaab3b7d7" ON "association" ("title") `,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photoId"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "photoId" uuid`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e24e7e2da4ece1feaeaab3b7d7"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_29e338e076c91e9dbc417a9db6"`,
    );
    await queryRunner.query(`DROP TABLE "association"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
