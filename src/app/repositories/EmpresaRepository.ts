import Empresa from "../entities/Empresa";
import IEmpresa from "../interfaces/IEmpresa";
import { AppdataSource } from "../../database/data_source";
import Bcrypt from "../../auth/bcrypt/bcrypt";
import * as bcrypt from "bcrypt";

/**
 * Repositório para gerenciar as operações de banco de dados para a entidade Empresa.
 * Centraliza toda a lógica de acesso a dados, como buscar, salvar e atualizar empresas.
 */
export default class EmpresaRepository {
    // Obtém o repositório do TypeORM para a entidade Empresa a partir da fonte de dados.
    private static repository = AppdataSource.getRepository(Empresa);

    /**
     * Busca e retorna todas as empresas cadastradas.
     * @returns Uma promessa que resolve para uma lista de todas as empresas.
     */
    static async find(): Promise<IEmpresa[]> {
        return this.repository.find();
    }

    /**
     * Busca uma empresa pelo seu ID.
     * @param id - O ID da empresa a ser buscada.
     * @returns Uma promessa que resolve para a empresa encontrada ou nulo se não for encontrada.
     */
    static async findById(id: number): Promise<IEmpresa | null> {
        try {
            // Busca a empresa no banco de dados pelo ID.
            const empresa = await this.repository.findOneBy({ id });
            return empresa;
        } catch (error) {
            // Em caso de erro, loga a exceção e retorna nulo.
            console.log("Erro ao buscar empresa:", error);
            return null;
        }
    }

    /**
     * Busca uma empresa pelo seu e-mail.
     * @param email - O e-mail da empresa a ser buscada.
     * @returns Uma promessa que resolve para a empresa encontrada ou nulo se não for encontrada.
     */
    static async findByEmail(email: string): Promise<IEmpresa | null> {
        try{
            const empresa = await this.repository.findOneBy({ email });
            return empresa;
        }catch (error) {
            console.log("Erro ao buscar empresa por email:", error);
            return null;
        }
    }

    /**
     * Cria e salva uma nova empresa no banco de dados. A senha é automaticamente criptografada pela entidade.
     * @param empresa - O objeto da empresa a ser salvo, contendo e-mail e senha.
     * @returns Uma promessa que resolve para a nova entidade da empresa salva.
     */
    static async saveEmpresa(empresa: IEmpresa): Promise<Empresa> {
        
        const newEmpresaEntity = await this.repository.create({
            email: empresa.email,
            password: empresa.password,
        });
        return await this.repository.save(newEmpresaEntity);
    }

    /**
     * Atualiza os dados de uma empresa existente.
     * @param id - O ID da empresa a ser atualizada.
     * @param dataToUpdate - Os novos dados para atualizar a empresa (e-mail e/ou senha).
     * @returns Uma promessa que resolve para a empresa atualizada ou nulo se não for encontrada.
     */
    static async updateEmpresa(id: number, dataToUpdate: IEmpresa): Promise<Empresa | null > {
        try {
            // Busca a empresa que será atualizada.
            const empresaToUpdate = await this.repository.findOneBy({ id });
            if (!empresaToUpdate) {
                // Se a empresa não for encontrada, retorna nulo.
                return null;
            }

            // Atualiza o e-mail apenas se um novo for fornecido no corpo da requisição.
            if (dataToUpdate.email) {
                empresaToUpdate.email = dataToUpdate.email;
            }

            // Atualiza e criptografa a senha apenas se uma nova for fornecida.
            if (dataToUpdate.password) {
                // É crucial criptografar a senha aqui, pois o hook @BeforeInsert da entidade
                // não é executado em operações de atualização (`save` de uma entidade já carregada).
                empresaToUpdate.password = await bcrypt.hash(dataToUpdate.password, 10);
            }

            // Salva as alterações no banco de dados. O TypeORM é inteligente e fará um UPDATE.
            return await this.repository.save(empresaToUpdate);
        } catch (error) {
            console.log("Erro ao atualizar empresa:", error);
            return null;
        }
    }

    /**
     * Valida as credenciais de uma empresa para login.
     * @param email - O e-mail da empresa.
     * @param password - A senha (em texto plano) a ser validada.
     * @returns Uma promessa que resolve para os dados da empresa (sem a senha) se as credenciais forem válidas, ou nulo caso contrário.
     */
    static async loginEmpresa(email: string, password: string): Promise<IEmpresa | null> {
        try {
            // Busca a empresa pelo e-mail fornecido.
            const empresa = await this.repository.findOneBy({ email });
            if (!empresa) {
                // Se não encontrar a empresa, retorna nulo (e-mail inválido).
                return null;
            }

            // Compara a senha fornecida (em texto plano) com o hash armazenado no banco.
            const isPasswordValid = await Bcrypt.compararSenhas(empresa.password, password);
            if (!isPasswordValid) {
                // Se as senhas não baterem, retorna nulo (senha inválida).
                return null;
            }

            // Remove a propriedade 'password' do objeto antes de retorná-lo para não expor o hash.
            const { password: _, ...empresaWithoutPassword } = empresa; 
            return empresaWithoutPassword;
           
        } catch (error) {
            console.log("Erro ao buscar empresa:", error);
            return null;
        }
    }
}
