import Empresa from "../entities/Empresa";

/**
 * Define a estrutura de dados para um objeto Produto.
 * Usado para garantir a tipagem correta ao passar dados de produtos pela aplicação.
 */
export default interface IProduto {
    id?: number;
    nome: string;
    preco: number;
    quantidade: number;
    empresa: Empresa;
}