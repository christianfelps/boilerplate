import EmpresaRepository from "../../repositories/EmpresaRepository";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { Request, Response } from "express";

interface IQueryProps {
    page?: number;
    limit?: number;
    filter?: string;
}


export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>( yup.object().shape({
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    filter: yup.string().optional(),
    }))
}));


export const getAll =  async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    try{
       const empresas = await EmpresaRepository.find()
       return res.status(200).json(empresas);
      }
     catch(error){
      return console.error(error)
     };
};
