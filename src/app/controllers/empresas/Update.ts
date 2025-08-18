import { Request, Response } from "express";
import EmpresaRepository from "../../repositories/EmpresaRepository";
import { validation } from "../../shared/middlewares";
import { IParams } from "../../interfaces/IParams";
import * as yup from "yup";
import IEmpresa from "../../interfaces/IEmpresa";

export const UpdateValidation = validation((getSchema) => ({
    body: getSchema<IEmpresa>(yup.object().shape({
        id: yup.number().integer().optional().moreThan(0),
        email: yup.string().required().min(3),
        password: yup.string().required().min(3),
    })),
    params: getSchema<IParams>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0)
    }))
}));

export const UpdateById = async (req: Request, res: Response) => {
    // Converte o ID do parâmetro da rota para número.
    const id: number = Number(req.params.id);
    const dadosBody = req.body;
    console.log(id ? 'achou' : 'nao');
    try {
        // Valida se o ID é um número válido e positivo.
        if (!id || id < 1) {
            // Retorna 400 Bad Request se o ID for inválido, pois a requisição está mal formatada.
            return res.status(400).json({ "error": "Forneça um ID válido." });
        }
        const empresa = await EmpresaRepository.findById(id);
        // Se a empresa não for encontrada no banco de dados, retorna 404 Not Found.
        if (!empresa) {
            return res.status(404).json({ error: 'Empresa não encontrada' });
        }

        const empresaAtualizada = await EmpresaRepository.updateEmpresa(empresa.id as number, dadosBody)

    } catch (e) {
        console.error({ e: e })
    }
};
