# 2º Dia: Back-end com Node.js

- [x] Criando projeto com Node.js
- [x] Rotas, parâmetros e métodos HTTP
- [x] Configurando banco de dados
- [x] Criando tabelas no banco
- [ ] Criando orfanato sem imagem
- [ ] Abstraindo em controller
- [ ] Listando orfanatos
- [ ] Upload de imagens
- [ ] Trabalhando com views
- [ ] Detalhe do orfanato
- [ ] Lidando com excessões
- [ ] Validação de dados

> Comando para gerar o arquivo `package.json` de configuração do ambiente.
```ps1
yarn init -y
```
> Instalaçao do pacote Express e o pacote de tipagem
```ps1
yarn add express
```
```ps1
yarn add @types/express -D
```
## Instalação do TypeScript
```ps1
yarn add typescript - D
```
### > Iniciar o TypeScript
```ps1
yarn tsc --init
```
### > Successfully created a tsconfig.json file.  
acessar este arquivo e alterar o parametro `"target":` de: "es5" --> para: "es2017"  
sigla de ECMAScript

### > Instalação do pacote ts-node-dev
```ps1
yarn add ts-node-dev -D
```

### > Inclusão de scripts personalizados no arquivo `package.json`  
> utilizado para executar scripts personalizados dentro da aplicação
```json
  "scripts": {
    "dev": "ts-node-dev src/server.ts"
  },
```
> Inclusão de flags no arquivo de configuração `package.json`
`--transpile-only` --> inibir as verificações das bibliotecas para avisos de erro no código.
`--ignore-watch node_modeles` --> ignorar as mudanças que ocorrerem na pasta "node_modules"

### > Executar o script para rodar a aplicação
```ps1
yarn dev
```

> Executar o NODE
```
node scr/server.ts
```

```ts
import express from 'express';

const app = express(); //criação da aplicação

app.use(express.json()); // É como se estivesse aplicando um plugin no app

// Criaçao da Rota
// Recurso = users
// Método HTTP = GET, POST, PUT, DELETE

// GET = Buscar uma informação (Lista, Item)
// POST = Criando uma informação
// PUT = Editando uma informação
// DELETE = Deletando uma informação

// Parâmetros
// Query Params: http://localhost:3333/users?search=diego
// Route Params: http://localhost:3333/users/1 (identificar um recurso)
// Body: http://localhost:3333/users (identificar um recurso)

app.post('/users/:id', (request, response) => {
    console.log(request.query);
    console.log(request.params);
    console.log(request.body); // É preciso iniciar uma função json do express

    return response.json({ message: 'Hello World'  });
});

app.listen(3333); // localhost:3333
```

## Configurando banco de dados
> Instalação da biblioteca typeorm + extensão `sqlite3` para integração do banco de dados com o Node
```ps1
> yarn add typeorm sqlite3
```

### typeorm  

Existem 3 formas de lidar com o banco de dados no backend
1. **Driver nativo** (utilizaremos `sqlite3`)
    - Primeiro nível de abstração
    - Ele permite executar as querys do banco de dados direto pelo Node, porém 
ele não oferece nenhum tipo de abstração, exemplo de utilização:

```ts 
sqlite3.query('SELECT * FROM users')
```
---
2. **Query builder** 
    - Segundo nível de abstração
    - É um contrutor de queries    
    - Integra com diversos BD's (KNEX.JS.org | typeorm.io)
    - Os scripts são escritos com JavaScript  
    - que depois será convertido para a query comum SQL.

```ts
knex('users').select('*').where('name', 'hamilton')

// SELECT * FROM users WHERE name = 'hamilton'
```
---
3. **ORM (Object Relational Mapping)**
    - Terceiro nível de abstração
    - Uma classe do js que simboliza uma tabela do banco de dados
    - Pra cada tabela no banco de dados terá uma classe dentro da aplicação
    - A query no banco de dados é escrito com a sintaxe js
    - Cada retorno do banco de dados será uma instância na classe. Exemplo:
      - [BD] Tabela: `Users`
      - [app] Classe: `User`
      - [BD] Tabela: `Users` retornar 3 usuários
      - [app] Classe: terá 3 instâncias de `User`
    - Integra com diversos BD's (KNEX.JS.org | typeorm.io)

### Criação do arquivo `ormconfig.json`
> Este arquivo deverá manter todas as informações da conexão com o banco de dados
- `"type"` - Tipo do database 
- `"database"` - Caminho para o database
```ts
{
  "type": "sqlite",
  "database": "./src/database/database.sqlite"
}
```
### Criação do arquivo `connection.ts`
> Importar do `'typeorm'` o objeto `{ createConnection }`
e depois chamamos a função dentro desse arquivo
```ts
import { createConnection } from 'typeorm';

createConnection();
```
> Importamos para dentro do arquivo `server.ts` para que seja executado.
```ts
import './database/connection';
```

## Criando as tabelas no banco

Uma forma não convencional para criação das tabelas do banco, chamado de ***Migrations***.

**Migrations** 
- Controle de versão do banco de dados. 
- Elas permitem a criação de um arquivo que contém as instruções para qualquer alteração no banco. Lendo esses arquivos e executando as instruções.

### Dentro da pasta `database > migrations`
> na instalação do `typeorm` é instalado um CLI com diversos comandos, que podemos utilizar para gerar os scripts.  
> Porém, nesse projeto precisamos rodar não com o `typeorm`e sim com `typescript`, para isso iremos executar da seguinte forma:

### Criaremos uma nova linha de script no arquivo `package.json`
```json
"typeorm": "ts-node-dev ./node_modules/typeorm/cli.js"
```
> Comando para executar o `typeorm`
```ps1
yarn typeorm
```

### Criando a primeira ***migration***.
No arquivo `ormconfig.json`:
1. Criaremos uma propriedade chamada `"migrations"`  
    >```json
    >"migrations": [
    >    "./src/database/migrations/*.ts"
    >]
    >```
    - Indicando que todos os arquivos com a extenção `.ts` dentro da pasta migrations serão de migração.

2. Criaremos uma propriedade chamada `"cli"` e abriremos um objeto `"migrationsDir"` onde informaremos ao typeorm onde deverá criar as novas migrations.
    >```json
    >"cli": {
    >  "migrationDir": "./src/database/migrations"
    >}
    >```

### Executando o comando para criar a primeira migration
> Passando o comando seguido do nome da migration `create_orphanages`
```ps1
yarn typeorm migration:create -n create_orphanages
```
> Foi criado um arquivo com duas classes **up** e **down**.  
  - Método `up` - Realiza alterações no banco de dados
    - Criar tabela
    - Criar um novo campo
    - Deletar algum campo
  - Método `down` - Desfaz todas as alterações realizadas pelo método `up` (rollback)

### Inserindo o comando de criação da tabela dentro do arquivo migration `create_orphanages`
> Implementando o método `up`
```ts
await queryRunner.createTable(new Table({}))
```
> Implementando o método `down`
```ts
await queryRunner.dropTable('orphanages');
```

### Executando a migration
> Comando para que a migration crie a tabela no banco de dados
```ps1
yarn typeorm migrations:run
```