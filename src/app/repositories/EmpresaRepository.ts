import Empresa from "../entities/Empresa";
import IEmpresa from "../interfaces/IEmpresa";
import { AppdataSource } from "../../database/data_source";
import Bcrypt from "../../auth/bcrypt/bcrypt";

export default class EmpresaRepository {
    private static repository = AppdataSource.getRepository(Empresa);

    static async getEmpresas(): Promise<IEmpresa[]> {
        return this.repository.find();
    }

    static async getEmpresaId(id: number): Promise<IEmpresa | null> {
        try {
            const empresa = await this.repository.findOneBy({ id });
            return empresa;
        } catch (error) {
            console.log("Erro ao buscar empresa:", error);
            return null;
        }
    }

    static async saveEmpresa(empresa: IEmpresa): Promise<Empresa> {
        const newEmpresa = await this.repository.save({
            email: empresa.email,
            password: empresa.password,
        });
        return newEmpresa;
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

