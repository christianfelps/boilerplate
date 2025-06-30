import { Router } from "express";
import userRouter from "../controllers/EmpresaController";
import empresaRouter from "../controllers/EmpresaController";

const routers = Router();

routers.use('/empresas', empresaRouter)

export default routers
