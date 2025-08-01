import { Router } from "express";
import userRouter from "../controllers/EmpresaController";
import empresaRouter from "../controllers/EmpresaController";
import { getAll } from "../controllers/empresas/GetAll";

const routers = Router();

routers.get('/empresas', getAll)
// routers.use('/produtos', produtoRouter)

export default routers
