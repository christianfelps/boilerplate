interface IProduto {
    id?: number;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    empresaId: number; // ID da empresa associada ao produto
    categoriaId?: number; // ID da categoria associada ao produto
    imagemUrl?: string; // URL da imagem do produto
}