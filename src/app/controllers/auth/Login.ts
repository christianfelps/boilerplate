import IEmpresa from "../../interfaces/IEmpresa";
import { Request, Response } from "express";
import EmpresaRepository from "../../repositories/EmpresaRepository";

  export const login =  async (req: Request<{}, {}, IEmpresa>, res: Response) => {
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
  }

