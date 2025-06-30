import empresa from "../entities/Empresa";
import IEmpresa from "../interfaces/IEmpresa";
import { AppdataSource } from "../../database/data_source"; 
import { Bcrypt } from "../../auth/bcrypt/bcrypt";
import { DataSource } from "typeorm";
import Empresa from "../entities/Empresa";

const bcrypt: Bcrypt = new Bcrypt();
const empresaRepository = AppdataSource.getRepository(empresa);

const getEmpresas =  (): Promise<IEmpresa[]> => {
    return  empresaRepository.find();
}

const getEmpresaId = async (id: number): Promise<IEmpresa | null> => {
   try{
     const empresaId = await empresaRepository.findOneBy({id: id})
     
    return empresaId
}catch(error){
    console.log("Erro ao buscar empresa:", error)
    return null
}
}

const saveEmpresa = async (empresa: IEmpresa): Promise<Empresa> => {
   
    
    const newEmpresa = await empresaRepository.save({email: empresa.email,
        password: await bcrypt.criptografarSenha(empresa.password)
    })
    return newEmpresa
    
}



export default {getEmpresas, getEmpresaId, saveEmpresa};

