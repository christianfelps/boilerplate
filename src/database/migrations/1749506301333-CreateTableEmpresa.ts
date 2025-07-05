import { MigrationInterface, QueryRunner, Table } from "typeorm";

/**
 * Classe de migração para criar a tabela de empresas.
 * Migrações são usadas para gerenciar a evolução do esquema do banco de dados de forma versionada.
 */
export class CreateTableEmpresa1749506301333 implements MigrationInterface {

    /**
     * O método `up` é executado quando aplicamos a migração.
     * Ele deve conter a lógica para criar tabelas, colunas, etc.
     */
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                // Nome da tabela a ser criada. Deve ser consistente com o nome na entidade.
                name: "empresas",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true, // Indica que o valor é gerado pelo banco (auto-incremento).
                        generationStrategy: "increment"
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "100",
                        isNullable: false,
                        isUnique: true // Garante que não haverá dois e-mails iguais.
                    },
                    {
                        name: "password",
                        type: "varchar",
                        // Aumentado para 100 para armazenar o hash bcrypt (que tem 60 caracteres).
                        length: "100",
                        isNullable: false
                    },
                ]
            })
        )
    }

    /**
     * O método `down` é executado quando revertemos a migração.
     * Ele deve conter a lógica para desfazer o que o método `up` fez.
     */
    public async down(queryRunner: QueryRunner): Promise<void> {
         // Apaga a tabela 'empresas' se a migração for revertida.
         await queryRunner.dropTable('empresas')
    }

}
