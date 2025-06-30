import "reflect-metadata";
import express, {Express} from 'express';
import { AppdataSource } from "./database/data_source";
import routers from "./app/routes/routes";
import empresaRouter from "./app/controllers/EmpresaController";
const app = express();

app.use(express.json());
app.use(routers)


app.get('/', (req, res) =>{
    res.json({
        Ola: "Mundo"
    })
})

export default app;