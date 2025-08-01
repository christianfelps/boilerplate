import IEmpresa from "../../interfaces/IEmpresa";
import { Request, Response } from "express";
import EmpresaRepository from "../../repositories/EmpresaRepository";

export const create = async (req: Request<{}, {}, IEmpresa >, res: Response) => {
   try {
    // Obtém os dados da empresa do corpo da requisição.
    const  empresa = req.body
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
};
