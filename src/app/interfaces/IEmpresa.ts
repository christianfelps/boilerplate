/**
 * Define a estrutura de dados para um objeto Empresa.
 * Usado para garantir a tipagem correta ao passar dados da empresa pela aplicação,
 * como no corpo de uma requisição (request body).
 */
export default interface IEmpresa {
    id?: number;
    email: string;
    password?: string;
}