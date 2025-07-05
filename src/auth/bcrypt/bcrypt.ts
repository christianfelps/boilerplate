import * as bcrypt from 'bcrypt'

 class Bcrypt{

  async criptografarSenha(senha: string): Promise<string>{

    return await bcrypt.hash(senha, 10);

  }

  async compararSenhas(senhaBanco: string, senhaDigitada: string): Promise<boolean>{

    return bcrypt.compare(senhaDigitada, senhaBanco);
  }

}

export default new Bcrypt();