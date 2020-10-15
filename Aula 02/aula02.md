## 2º Dia: Back-end com Node.js

- [x] Criando projeto com Node.js
- [ ] Rotas, parâmetros e métodos HTTP
- [ ] Configurando banco de dados
- [ ] Criando tabelas no banco
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