import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,  JoinColumn } from "typeorm";
import Empresa from "./Empresa";
import IProduto from "../interfaces/IProduto";
import { IsNumber, Min, Length,} from "class-validator";

/**
 * Representa a entidade 'Produto' no banco de dados.
 * @Entity('produtos') - Define a classe como uma entidade do TypeORM e especifica o nome da tabela.
 */
@Entity('produtos')
export default class Produto implements IProduto {
    
    /**
     * ID único do produto, gerado automaticamente.
     * @PrimaryGeneratedColumn - Marca a coluna como a chave primária da tabela.
     */
    @PrimaryGeneratedColumn("increment")
    id!: number;

    /**
     * Nome do produto.
     * @Length - Validador que garante que o nome tenha entre 3 e 100 caracteres.
     */
    @Length(3, 100, { message: "o nome precisa ter entre 3 e 100 caracteres"})
    @Column('varchar', {length: 100, nullable: false})
    nome!: string


    /**
     * Preço do produto.
     * @IsNumber - Validador que garante que o valor é um número.
     * @Min(0) - Validador que garante que o preço não seja negativo.
     * @Column("decimal") - Define o tipo da coluna como decimal para precisão monetária.
     */
    @IsNumber({}, { message: "O preço deve ser um número válido" })
    @Min(0, { message: "O preço não pode ser negativo" })
    @Column("decimal", { precision: 10, scale: 2, nullable: false })
    preco!: number

    /**
     * Quantidade em estoque do produto.
     * @IsNumber - Validador que garante que o valor é um número.
     * @Column("integer") - Define o tipo da coluna como um inteiro.
     */
    @IsNumber({}, { message: "A quantidade deve ser um número válido" })
    @Column("integer", { nullable: false})
    quantidade!: number

   /**
    * Relação muitos-para-um. Muitos produtos pertencem a uma empresa.
    * @ManyToOne - Define o lado "muitos" da relação. Este é o lado que terá a chave estrangeira.
    * @JoinColumn - Especifica que esta entidade possui a chave estrangeira (empresa_id).
    */
   @ManyToOne(() => Empresa, (empresa) => empresa.produtos)
   @JoinColumn({name: "empresa_id"})
    empresa!: Empresa;

}
