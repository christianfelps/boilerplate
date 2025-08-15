import { Router } from "express";
import { empresaController } from "../controllers";

const routers = Router();

routers.get('/empresas/:id', empresaController.getByIdValidation, empresaController.getById)
routers.get('/empresas', empresaController.getAllValidation, empresaController.getAll)
routers.post('/empresas', empresaController.createValidation, empresaController.create)
// routers.use('/produtos', produtoRouter)

export default routers
