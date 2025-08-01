import * as jwt from "jsonwebtoken"; 

/**
 * Interface que define a estrutura dos dados a serem codificados no token JWT.
 * @param uid - O ID do usuário (ou da entidade) a ser armazenado no token.
 */
interface IJWTData {
    uid: number;
}

const JWTError = {
    SECRET_NOT_FOUND: 'JWT_SECRET_NOT_FOUND',
    INVALID_TOKEN: 'INVALID_TOKEN',

} as const 
  


type VerifyResult = IJWTData | typeof JWTError[keyof typeof JWTError];

/**
 * Gera um token JWT assinado.
 * 
 * @param data - Os dados a serem incluídos no payload do token, conforme a interface IJWTData.
 * @returns Uma string contendo o token JWT ou 'JWT_SECRET_NOT_FOUND' se a chave secreta não estiver configurada.
 */
const sign = (data: IJWTData) => {
    // Verifica se a chave secreta do JWT está definida no ambiente.
    const secret = process.env.JWT_SECRET;
    if (!secret) return JWTError.SECRET_NOT_FOUND;

    return jwt.sign(data, secret, {expiresIn: '24h'});
};

/**
 * Verifica a validade de um token JWT.
 * 
 * @param token - A string do token JWT a ser verificado.
 * @returns O payload decodificado (IJWTData) se o token for válido, 
 * ou uma string indicando o tipo de erro ('JWT_SECRET_NOT_FOUND' ou 'INVALID_TOKEN').
 */
const verify = (token: string): VerifyResult => {
        const secret = process.env.JWT_SECRET;

    if (!secret) return JWTError.SECRET_NOT_FOUND;

    try {
        const decoded = jwt.verify(token, secret);
        if (typeof decoded === 'string') {
            return JWTError.INVALID_TOKEN;
        }
        return decoded as IJWTData;
    } catch (error) {
        return "INVALID_TOKEN";
    }
};

/**
 * Objeto de serviço que agrupa as funções de manipulação de JWT para serem usadas na aplicação.
 */
export const JWTService = {
    sign,
    verify  
}