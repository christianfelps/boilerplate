import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableEmpresa1749506301333 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "empresas",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "100",
                        isNullable: false
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "100",
                        isNullable: false
                    },
                
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.dropTable('empresas')
    }

}
