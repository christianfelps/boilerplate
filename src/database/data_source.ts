import "reflect-metadata";
import 'dotenv/config'
import { DataSource } from "typeorm";
import { CreateTableEmpresa1749506301333 } from "./migrations/1749506301333-CreateTableEmpresa";
import { CreateProdutosTable1749506928651 } from "./migrations/1749506928651-CreateProdutosTable";
import Empresa from "../app/entities/Empresa";
import Produto from "../app/entities/Produto";
export const AppdataSource = new DataSource({
    type: "mysql",
    host:process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB,
    synchronize: true,
    logging: false,
    entities: [Empresa, Produto],
    migrations: [CreateTableEmpresa1749506301333, CreateProdutosTable1749506928651],
    subscribers: []

})