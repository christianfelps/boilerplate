import { IsEmail, Length } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert } from "typeorm";
import Produtos from "./Produto";
import * as bcrypt from "bcrypt";
import IEmpresa from "../interfaces/IEmpresa";

/**
 * Representa a entidade 'Empresa' no banco de dados.
 * Cada instância desta classe corresponde a uma linha na tabela 'empresas'.
 * @Entity('empresas') - Define a classe como uma entidade do TypeORM e especifica o nome da tabela.
 */
@Entity('empresas')
export default class Empresa implements IEmpresa {
    /**
     * ID único da empresa, gerado automaticamente.
     * @PrimaryGeneratedColumn - Marca a coluna como a chave primária da tabela.
     */
    @PrimaryGeneratedColumn("increment")
    id!: number;

    /**
     * E-mail da empresa, usado para login e contato.
     * @Length(10, 100) - Validador que garante que o e-mail tenha entre 10 e 100 caracteres.
     * @IsEmail - Validador que verifica se o valor é um formato de e-mail válido.
     * @Column - Marca a propriedade como uma coluna no banco de dados.
     */
    @Length(10, 100)
    @IsEmail({}, {message: "E-mail invalido"})
    @Column('varchar', {length: 100, nullable: false})
    email!: string

    /**
     * Senha da empresa. Será armazenada como um hash.
     * @Length(100) - Validador que define o tamanho máximo. Importante que seja grande o suficiente para o hash.
     */
    @Length(100)
    @Column('varchar', {length: 100, nullable: false})
    password!: string

    /**
     * Hook do TypeORM que é executado antes de uma nova empresa ser inserida no banco.
     * Utilizado aqui para criptografar a senha automaticamente.
     */
    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password!, 10);
    }

    /**
     * Relação um-para-muitos. Uma empresa pode ter vários produtos.
     * @OneToMany - Define o lado "um" da relação.
     */
    @OneToMany(() => Produtos, (produtos) => produtos.empresa)
    produtos!: Produtos[]

}
