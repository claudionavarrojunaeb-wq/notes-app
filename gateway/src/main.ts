import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { environmentsVariables } from './config';

async function main() {
  const logger = new Logger('Gateway'); // Creamos un logger para la clase Main
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Elimina propiedades que no están definidas en los DTOs
      forbidNonWhitelisted: true, // Lanza un error si se envían propiedades no definidas en los DTOs
      // transform: true, // Transforma los payloads a los tipos definidos en los DTOs
    }),
  );
  await app.listen(environmentsVariables.PORT); // Iniciamos la aplicación en el puerto definido en las variables de entorno
  logger.log(`Gateway is running on port ${environmentsVariables.PORT}`); // Logueamos un mensaje indicando que la aplicación se ha iniciado correctamente
}
void main();
