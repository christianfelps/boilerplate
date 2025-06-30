import { IsEmail, Length, length } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert } from "typeorm";
import Produtos from "./Produto";
import * as bcrypt from "bcrypt";

@Entity('empresas')
export default class Empresa{
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Length(10, 100)
    @IsEmail({}, {message: "E-mail invalido"})
    @Column('varchar', {length: 100, nullable: false})
    email!: string

    
    @Length(100)
    @Column('varchar', {length: 100, nullable: false})
    password!: string

    @BeforeInsert()
    async hashPassword(){
        this.password = await bcrypt.hash(this.password!, 10);
    }
    @OneToMany(() => Produtos, (produtos) => produtos.empresa)
    produtos!: Produtos[]

}
