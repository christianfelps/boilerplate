import {Request, Response, Router} from 'express';
import EmpresaRepository from '../repositories/EmpresaRepository';
import IEmpresa from '../interfaces/IEmpresa';
const empresaRouter = Router();

empresaRouter.get('/', async (_req: Request, res: Response) => {
    const empresas = await EmpresaRepository.find();
     res.status(200).json(empresas);
     return;
});
empresaRouter.get('/:id', async (req: Request, res: Response) => {
    const  id : number = Number(req.params.id)
    if(!id || id < 1){
      res.status(404).json({"error": "Forneca um ID Correto"})
      return;
    }
    const empresas = await EmpresaRepository.findById(id);
     res.status(200).json(empresas);
     return;
});
empresaRouter.post('/cadastrar', async (req: Request, res: Response) => {
   try {
    const  empresa : IEmpresa = req.body
    if(!empresa.email || !empresa.password ){
        res.status(400).send("email e senha sao obrigatorios");
        return;
    }

    const emailExistente = await EmpresaRepository.findByEmail(empresa.email);
    if(emailExistente){
      res.status(400).send({ error: 'Email já cadastrado' });
      return;
    }
    const newEmpresa = await EmpresaRepository.saveEmpresa(empresa);
    res.status(201).json(newEmpresa);
    return;
   }catch (error) {
    console.error(error);
     res.status(500).json({ error: 'Erro ao cadastrar empresa' });
     return;
  } 
});

  empresaRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Email e senha são obrigatórios' });
            return;
        }
        const empresa = await EmpresaRepository.loginEmpresa(email, password);
        if (!empresa) {
            res.status(401).json({ error: 'Email ou senha inválidos' });
            return;
        }
        // TODO: Gerar e retornar um token JWT em vez dos dados da empresa
        res.status(200).json({"sucesso": "Login realizado com sucesso", });
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao realizar login' });
    } 
  })

export default empresaRouter
