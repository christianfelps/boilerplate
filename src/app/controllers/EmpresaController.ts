import {Request, Response, Router} from 'express';
import EmpresaRepository from '../repositories/EmpresaRepository';
import IEmpresa from '../interfaces/IEmpresa';

const empresaRouter = Router();

empresaRouter.get('/', async (_req: Request, res: Response) => {
    const empresas = await EmpresaRepository.getEmpresas();
     res.status(200).json(empresas);
     return;
});
empresaRouter.get('/:id', async (req: Request, res: Response) => {
    const  id : number = Number(req.params.id)
    if(!id || id < 1){
      res.status(404).json({"error": "Forneca um ID Correto"})
      return;
    }
    const empresas = await EmpresaRepository.getEmpresaId(id);
     res.status(200).json(empresas);
     return;
});
empresaRouter.post('/cadastrarempresa', async (req: Request, res: Response) => {
   try {
    const  empresa : IEmpresa = req.body
    if(!empresa.email || !empresa.password ){
        res.status(404).send("email ou password invalidos");
        return;
    }
    const newEmpresa = await EmpresaRepository.saveEmpresa(empresa);
     res.status(201).json(newEmpresa)
     return
   }catch (error) {
    console.error(error);
     res.status(500).send({ error: 'Erro ao cadastrar empresa' });
     return;
  } 
});

export default empresaRouter
