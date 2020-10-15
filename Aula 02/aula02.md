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

> Executar o NODE
```
node scr/server.ts
```