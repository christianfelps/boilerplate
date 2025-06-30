import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCompanyTable1749341503481 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "empresa",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
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
                        length: "15",
                        isNullable: false
                    },
                
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.dropTable('company')
    }

}
