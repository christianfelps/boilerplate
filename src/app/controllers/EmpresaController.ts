import {Request, Response, Router} from 'express';
import EmpresaRepository from '../repositories/EmpresaRepository';
import IEmpresa from '../interfaces/IEmpresa';
// Cria um novo roteador do Express para agrupar as rotas relacionadas à empresa.
const empresaRouter = Router();

/**
 * Rota GET /
 * Busca e retorna uma lista de todas as empresas.
 */
empresaRouter.get('/', async (_req: Request, res: Response) => {
    const empresas = await EmpresaRepository.find();
     res.status(200).json(empresas);
});

/**
 * Rota GET /:id
 * Busca e retorna uma empresa específica pelo seu ID.
 */
empresaRouter.get('/:id', async (req: Request, res: Response) => {
    // Converte o ID do parâmetro da rota para número.
    const  id : number = Number(req.params.id)
    // Valida se o ID é um número válido e positivo.
    if(!id || id < 1){
      // Retorna 400 Bad Request se o ID for inválido, pois a requisição está mal formatada.
      return res.status(400).json({"error": "Forneça um ID válido."});
    }
    const empresa = await EmpresaRepository.findById(id);
    // Se a empresa não for encontrada no banco de dados, retorna 404 Not Found.
    if (!empresa) {
        return res.status(404).json({ error: 'Empresa não encontrada' });
    }
    // Retorna a empresa encontrada com status 200 OK.
     res.status(200).json(empresa);
});

/**
 * Rota POST /cadastrar
 * Cria uma nova empresa.
 */
empresaRouter.post('/cadastrar', async (req: Request, res: Response) => {
   try {
    // Obtém os dados da empresa do corpo da requisição.
    const  empresa : IEmpresa = req.body
    // Validação básica para garantir que e-mail e senha foram enviados.
    if(!empresa.email || !empresa.password ){
        return res.status(400).json({ error: "E-mail e senha são obrigatórios" });
    }

    // Verifica se o e-mail já está cadastrado para evitar duplicatas.
    const emailExistente = await EmpresaRepository.findByEmail(empresa.email);
    if(emailExistente){
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }
    // Salva a nova empresa no banco de dados.
    const newEmpresa = await EmpresaRepository.saveEmpresa(empresa);
    // Retorna a empresa recém-criada com status 201 Created.
    res.status(201).json(newEmpresa);
   }catch (error) {
    console.error(error);
    // Em caso de erro inesperado no servidor, retorna 500 Internal Server Error.
     res.status(500).json({ error: 'Erro ao cadastrar empresa' });
  } 
});

/**
 * Rota POST /login
 * Autentica uma empresa e, futuramente, retornará um token de acesso.
 */
  empresaRouter.post('/login', async (req: Request, res: Response) => {
    try {
        // Extrai e-mail e senha do corpo da requisição.
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
        }
        // Tenta fazer o login usando o repositório. O método já retorna o objeto sem a senha.
        const empresa = await EmpresaRepository.loginEmpresa(email, password);
        if (!empresa) {
            // Retorna 401 Unauthorized para credenciais inválidas.
            return res.status(401).json({ error: 'E-mail ou senha inválidos' });
        }
        // TODO: Gerar e retornar um token JWT em vez dos dados da empresa
        // Retorna os dados da empresa (sem a senha) e uma mensagem de sucesso.
        res.status(200).json({ message: "Login realizado com sucesso", data: empresa });
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao realizar login' });
    } 
  })

export default empresaRouter
