import { RequestHandler } from "express"
import { ValidationError, ObjectSchema, Maybe, AnyObject, } from "yup";
import { StatusCodes } from "http-status-codes";

type TProperty = "body" | "header" | "params" | "query";

type TGetSchema = <T extends Maybe<AnyObject>>(schema: ObjectSchema<T>) => ObjectSchema<T>;

type TAllSchemas = Record<TProperty, ObjectSchema<any>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;



export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {

  const schemas = getAllSchemas(schema => schema);

  const errorResult: Record<string,Record<string, string>> ={ }

  // Entra dentro do meu objeto e cria array com chave e valor
  for (const [key, schema] of Object.entries(schemas)) {
    
    try {
      schema.validateSync(req[key as TProperty ], { abortEarly: false });
      // return next()
      
    } catch (err) {
      
      //Mapeando os erros
      const yupError = err as ValidationError;
      //      Chave    Valor
      const errors: Record<string, string> = {};
      
    // Mapeia os erros do yup
      yupError.inner.forEach(error => {
        
        if (!error.path) return;
        
        errors[error.path] = error.message;
        
      });
      
      errorResult[key] = errors;    
    }
    
    
  }
  // Se houver erros retornam todos juntos
  if(Object.entries(errorResult).length > 0 ) {
    return res.status(StatusCodes.BAD_REQUEST).json({errors: errorResult});
  }

  // Se não houver erro, segue para o proxímo middleware
    return next();
  


}
