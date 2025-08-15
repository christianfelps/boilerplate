import { Request, Response } from "express";
import EmpresaRepository from "../../repositories/EmpresaRepository";
import { validation } from "../../shared/middlewares";
import { IParams } from "../../interfaces/IParams";
//import { IEmpresa } from "../../interfaces/IEmpresa";
import * as yup from "yup";


export const UpdateById = async (req: Request, res: Response) => {
    // Converte o ID do parâmetro da rota para número.
    const  id : number = Number(req.params.id);
    console.log( id ? 'achou' : 'nao')
    try{
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

    }catch(e){
        console.error({e: e})
    }
};
