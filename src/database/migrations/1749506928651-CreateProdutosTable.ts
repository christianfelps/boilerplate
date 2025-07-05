import { MigrationInterface, QueryRunner, Table } from "typeorm";

/**
 * Classe de migração para criar a tabela de produtos.
 */
export class CreateProdutosTable1749506928651 implements MigrationInterface {
  /**
   * Executa a migração para criar a tabela 'produtos'.
   */
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
            // Ajustado para 100 para ser consistente com a entidade.
            length: "100",
            isNullable: false
          },
          {
            name: "preco",
            type: "decimal",
            precision: 10, // Total de dígitos.
            scale: 2,
            isNullable: false
          },
          {
            name: "quantidade",
            type: "integer",
            isNullable: false
          },
          {
            name: "empresa_id",
            type: "int",
            isNullable: false
          },
        ],
        // Define a chave estrangeira para conectar produtos a empresas.
        foreignKeys:[
          {
            name: "FK_Produto_Empresa",
            columnNames: ["empresa_id"], // Coluna nesta tabela.
            referencedTableName: "empresas", // Tabela de destino.
            referencedColumnNames: ["id"], // Coluna na tabela de destino.
            onDelete: "CASCADE" // Se uma empresa for deletada, seus produtos também serão.
          }
        ]
      })
    );
  }

  /**
   * Reverte a migração, apagando a tabela 'produtos'.
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    // O TypeORM lida com a remoção da chave estrangeira automaticamente ao apagar a tabela.
    await queryRunner.dropTable("produtos");
  }
}
