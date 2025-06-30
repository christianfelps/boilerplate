import { IsEmail, Length, length } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Unique, ManyToOne, Decimal128, JoinColumn } from "typeorm";
import Empresa from "./Empresa";

@Entity('produtos')
export default class Produto{
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Length(3, 100, { message: "o nome precisa ter entre 3 e 100 caracteres"})
    @Column('varchar', {length: 100, nullable: false})
    nome!: string

    
    @Length(8, 15)
    @Column("decimal", { precision: 10, scale: 2, nullable: false })
    preco!: string

   @ManyToOne(() => Empresa, (empresa) => empresa.produtos)
   @JoinColumn({name: "empresa_id"})
    empresa!: Empresa;

}
