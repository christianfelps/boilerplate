import * as bcrypt from 'bcrypt'

/**
 * Classe wrapper para a biblioteca bcrypt.
 * Centraliza a lógica de comparação de senhas para ser usada de forma consistente na aplicação.
 * Exporta uma instância única (padrão Singleton) para evitar múltiplas instanciações.
 */
 class Bcrypt{

  /**
   * Compara uma senha em texto plano com um hash armazenado.
   * @param senhaDigitada - A senha em texto plano fornecida pelo usuário.
   * @param senhaBanco - O hash da senha que está armazenado no banco de dados.
   * @returns Uma promessa que resolve para 'true' se as senhas corresponderem, e 'false' caso contrário.
   */
  async compararSenhas(senhaBanco: string, senhaDigitada: string): Promise<boolean>{
    // A ordem correta para bcrypt.compare é (textoPlano, hash)
    return bcrypt.compare(senhaDigitada, senhaBanco);
  }

}

export default new Bcrypt();