import Empresa from "../entities/Empresa";
import IEmpresa from "../interfaces/IEmpresa";
import { AppdataSource } from "../../database/data_source";
import Bcrypt from "../../auth/bcrypt/bcrypt";

export default class EmpresaRepository {
    private static repository = AppdataSource.getRepository(Empresa);

    static async find(): Promise<IEmpresa[]> {
        return this.repository.find();
    }

    static async findById(id: number): Promise<IEmpresa | null> {
        try {
            const empresa = await this.repository.findOneBy({ id });
            return empresa;
        } catch (error) {
            console.log("Erro ao buscar empresa:", error);
            return null;
        }
    }

    static async findByEmail(email: string): Promise<IEmpresa | null> {
        try{
            const empresa = await this.repository.findOneBy({ email });
            return empresa;
        }catch (error) {
            console.log("Erro ao buscar empresa por email:", error);
            return null;
        }
    }
    static async saveEmpresa(empresa: IEmpresa): Promise<Empresa> {
        const newEmpresaEntity = await this.repository.create({
            email: empresa.email,
            password: empresa.password,
        });
        return await this.repository.save(newEmpresaEntity);
    }

    static async loginEmpresa(email: string, password: string): Promise<IEmpresa | null> {
        try {
            const empresa = await this.repository.findOneBy({ email });
            if (!empresa) {
                return null;
            }
            const isPasswordValid = await Bcrypt.compararSenhas(empresa.password, password);
            if (!isPasswordValid) {
                return null;
            }
            return empresa;
        } catch (error) {
            console.log("Erro ao buscar empresa:", error);
            return null;
        }
    }
}

