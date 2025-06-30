import { ForeignKey, MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateProdutosTable1711111111112 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "produtos",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: "nome",
            type: "varchar",
            length: "50",
            isNullable: false
          },
          {
            name: "preco",
            type: "decimal",
            precision: 10,
            scale: 2,
            isNullable: false
          },
          {
            name: "empresa_id",
            type: "int",
            isNullable: false
          },

        ],
        foreignKeys:[
          {
            name: "FK_Produto_Empresa",
            columnNames: ["empresa_id"],
            referencedTableName: "empresas",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE"

          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove a foreign key primeiro
    const table = await queryRunner.getTable("produtos");
    const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.indexOf("empresa_id") !== -1);
    if (foreignKey) {
      await queryRunner.dropForeignKey("produtos", foreignKey);
    }

    // Remove a tabela
    await queryRunner.dropTable("produtos");
  }
}
