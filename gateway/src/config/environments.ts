import 'dotenv/config'; // Carga las variables de entorno desde el archivo .env
import * as joi from 'joi'; // Librería para validar las variables de entorno

interface EnvironmentVariables {
  // Interfaz para tipar las variables de entorno
  PORT: number;
  NATS_SERVER: string;
}

const environmentSchema = joi
  .object({
    // Esquema de validación para las variables de entorno
    PORT: joi.number().required(),
    NATS_SERVER: joi.string().required(),
  })
  .unknown(); //para que valide solo las del .env y no se queje por otras variables de entorno

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { error, value } = environmentSchema.validate({
  ...process.env,
}); // Validamos las variables de entorno

if (error) {
  throw new Error(`Error en las variables de entorno: ${error.message}`); // Si hay un error, lanzamos una excepción
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const env: EnvironmentVariables = value; // Si todo es correcto, asignamos las variables de entorno a la constante env

export const environmentsVariables = {
  PORT: env.PORT,
  natsServer: env.NATS_SERVER,
}; // Exportamos las variables de entorno para usarlas en el resto de la aplicación
