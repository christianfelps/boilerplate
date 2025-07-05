import * as bcrypt from 'bcrypt'

 class Bcrypt{

  async compararSenhas(senhaBanco: string, senhaDigitada: string): Promise<boolean>{

    return bcrypt.compare(senhaDigitada, senhaBanco);
  }

}

export default new Bcrypt();