```
PS D:\proyectos\notes-app\gateway> npm install -g @nestjs/cli
PS D:\proyectos\notes-app\gateway> npm install class-validator class-transformer @nestjs/microservices joi dotenv rxjs nats
```

| | |
|---|---|
|class-validator|validarendpoints con dto|
|class-transformer|transformar datos de tipo texto a tipo numerico o viceversa|
|@nestjs/microservices|microservicios|
|joi|validador de esquemas para validar variables de entorno|
|dotenv|leer variables de entorno|
|rxjs|utilizar observables dentro de este entorno de node|
|nats|broker mensajes entre microservicios|

```
PS D:\proyectos\notes-app\gateway> npm remove 
@typescript-eslint/eslint-preview 
eslint 
eslint-config-prettier
```
---

PS D:\proyectos\notes-app\gateway> nest g --help 

Usage: nest generate|g [options] <schematic> [name] [path]

Generate a Nest element.
  Schematics available on @nestjs/schematics collection:

|  name         | alias       |  description                                 |
|---------------|-------------|----------------------------------------------|
| application   | application | Generate a new application workspace         |
| class         | cl          | Generate a new class                         |
| configuration | config      | Generate a CLI configuration file            |
| controller    | co          | Generate a controller declaration            |
| decorator     | d           | Generate a custom decorator                  |
| filter        | f           | Generate a filter declaration                |
| gateway       | ga          | Generate a gateway declaration               |
| guard         | gu          | Generate a guard declaration                 |
| interceptor   | itc         | Generate an interceptor declaration          |
| interface     | itf         | Generate an interface                        |
| library       | lib         | Generate a new library within a monorepo     |
| middleware    | mi          | Generate a middleware declaration            |
| module        | mo          | Generate a module declaration                |
| pipe          | pi          | Generate a pipe declaration                  |
| provider      | pr          | Generate a provider declaration              |
| resolver      | r           | Generate a GraphQL resolver declaration      |
| resource      | res         | Generate a new CRUD resource                 |
| service       | s           | Generate a service declaration               |
| sub-app       | app         | Generate a new application within a monorepo |


Options:
| | |
|-|-|
|  -d, --dry-run                    |  Report actions that would be taken without writing out results.
|  -p, --project [project] |  Project in which to generate files.                            
|  --flat                           |  Enforce flat structure of generated element.                   
|  --no-flat                        |  Enforce that directories are generated.                        
|  --spec                           |  Enforce spec files generation. (default: true)                 
|  --spec-file-suffix [suffix]      |  Use a custom suffix for spec files.                            
|  --skip-import                    |  Skip importing (default: false)                                
|  --no-spec                        |  Disable spec files generation. | 
|  -c, --collection [collectionName]|  Schematics collection to use.
|  -h, --help                       |  Output usage information.




---

PS D:\proyectos\notes-app\gateway> **nest g res auth --no-spec**


---

sudo service docker start
docker ps
docker start nats

docker run -d --name nats -p 4222:4222 -p 8222:8222 -v nats-data:/data nats -js -sd /data -m 8222

# NATS + JetStream en Docker sobre WSL Ubuntu

## Estado actual

NATS está ejecutándose en Docker dentro de Ubuntu WSL.

Puertos:

* `4222` → Clientes NATS
* `8222` → Monitoreo HTTP
* `6222` → Clustering NATS

URL de conexión:

```text
nats://localhost:4222
```

Monitoreo:

[http://localhost:8222/varz](http://localhost:8222/varz)
[http://localhost:8222/jsz](http://localhost:8222/jsz)


---

# Iniciar Docker después de reiniciar WSL

```bash
sudo service docker start
```

Verificar:

```bash
docker ps
```

---

# Iniciar NATS manualmente

Si el contenedor existe pero está detenido:

```bash
docker start nats
```

Verificar:

```bash
docker ps
```

---

# Iniciar Docker y NATS en un solo comando

```bash
sudo service docker start && docker start nats && docker ps
```

---

# Ver logs de NATS

```bash
docker logs nats
```

Logs en tiempo real:

```bash
docker logs -f nats
```

---

# Verificar monitoreo

```bash
curl http://localhost:8222/varz
```

Información JetStream:

```bash
curl http://localhost:8222/jsz
```

---

# Configurar inicio automático del contenedor

Ejecutar una sola vez:

```bash
docker update --restart unless-stopped nats
```

Verificar:

```bash
docker inspect nats --format '{{.HostConfig.RestartPolicy.Name}}'
```

Resultado esperado:

```text
unless-stopped
```

Con esta configuración, al iniciar Docker:

```bash
sudo service docker start
```

el contenedor NATS se iniciará automáticamente.

---

# Crear nuevamente el contenedor NATS + JetStream

Eliminar contenedor existente:

```bash
docker rm -f nats
```

Crear nuevamente:

```bash
docker run -d --name nats -p 4222:4222 -p 8222:8222 nats -js -m 8222
```

Verificar:

```bash
docker ps
```

---

# Comandos útiles

Ver contenedores:

```bash
docker ps
```

Ver todos los contenedores:

```bash
docker ps -a
```

Detener NATS:

```bash
docker stop nats
```

Iniciar NATS:

```bash
docker start nats
```

Reiniciar NATS:

```bash
docker restart nats
```

Eliminar NATS:

```bash
docker rm -f nats
```


# Pruebas de NATS desde Navegador y Consola

## Verificar que NATS está funcionando

Abrir en el navegador:


[http://localhost:8222/varz](http://localhost:8222/varz)


Respuesta esperada:

```json
{
  "version": "2.14.2",
  "connections": 0
}
```

---

## Verificar JetStream

Abrir:

[http://localhost:8222/jsz](http://localhost:8222/jsz)

Respuesta esperada:

```json
{
  "streams": 0,
  "consumers": 0,
  "messages": 0
}
```

---

## Verificar estado del servidor

Abrir:

[http://localhost:8222/healthz](http://localhost:8222/healthz)

Respuesta esperada:

```text
ok
```

---

## Ver conexiones activas

Abrir:

[http://localhost:8222/connz](http://localhost:8222/connz)

---

## Ver suscripciones activas

Abrir:

[http://localhost:8222/subsz]
(http://localhost:8222/subsz)


---

# Limitación importante

El puerto:

```text
4222
```

NO es HTTP.

Por lo tanto esto NO funciona:

[http://localhost:4222](http://localhost:4222)
```

ni:

[http://localhost:4222/varz](http://localhost:4222/varz)

porque el puerto 4222 utiliza el protocolo NATS.

---

# Instalar NATS CLI

```bash
curl -sf https://binaries.nats.dev/nats-io/natscli/nats@latest | sh
sudo mv nats /usr/local/bin/
```

Verificar:

```bash
nats --version
```

---

# Prueba de publicación y suscripción

## Terminal 1

Escuchar mensajes:

```bash
nats sub prueba
```

Resultado esperado:

```text
Listening on prueba
```

---

## Terminal 2

Publicar mensaje:

```bash
nats pub prueba "hola mundo"
```

Resultado esperado:

```text
Published 10 bytes to "prueba"
```

---

## Resultado en Terminal 1

```text
[#1] Received on "prueba"
hola mundo
```

---

# Verificar contenedor NATS

```bash
docker ps
```

Resultado esperado:

```text
CONTAINER ID   IMAGE   STATUS
xxxxxxxxxxxx   nats    Up
```

---

# Ver logs

```bash
docker logs nats
```

Logs en tiempo real:

```bash
docker logs -f nats
```

---

# Verificar JetStream desde API

```bash
curl http://localhost:8222/jsz
```

Respuesta esperada:

```json
{
  "streams": 0,
  "consumers": 0,
  "messages": 0
}
```

---

# Datos de conexión

Servidor:

[nats://localhost:4222](nats://localhost:4222)

Monitoreo:

[http://localhost:8222/varz](http://localhost:8222/varz)

JetStream:

[http://localhost:8222/jsz](http://localhost:8222/jsz)