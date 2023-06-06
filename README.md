### Pré-requisitos

A **stack** utilizada, foi montada utilizando um agrupamento de tecnolgias para melhor flexibilização e personalização do sistema. Abaixo uma lista breve com as tecnologias utilizadas:

 - **Npm**
 - **Webpack**
 - **WebPack Dev Server**
 - **Babel**
 - **React**
 - **ESLint**
 - **JSDoc**
 - **Husky**

### Executando a aplicação front-end

A seguir descrevo passo-a-passo os seguintes comandos para iniciar a aplicação em modo de desenvolvimento. Partindo da raiz do projeto execute os seguintes comandos:

### Instalação, desenvolvimento e compilação

Na pasta raiz do projeto executo o seguinte comando em seu terminal:

```bash
npm install
```

Após a execução da instalação das dependências, ainda na pasta raiz do projeto execute o seguinte comando para executar a aplicação em modo de desenvolvimento. A aplicação iniciará utilizando a porta `3000`.

```bash
npm run start 
```

Após a finalização do desenvolvimento, é possível gerar um pacote para ser enviado para o ambiente de homologação ou produção. Para compilar esse pacote, utilize o comando abaixo:

```bash
npm run build:prod
```

## JsDocs

O projeto possui um pequena área aonde é possível gerar uma documentação visual de todos os métodos utilizados que não sejam no modelo `JSX`. Para realizar a visualização desse documento, basta utilizar a seguinte linha de comando em seu terminal:

```bash
npm run docs
```

Após o documento ser gerado com sucesso, uma nova pasta chamada `.docs` será adicionada a raiz do projeto e dentro da mesma, alguns arquivos `.html` serão criados com uma aplicalção visual interna para navegação dos métodos que o projeto contém.

## Webpack Bundle Analyzer

O projeto também possui um analisador de `bundles` e `chunks`. Essa função permite verificar quais arquivos tem mais peso dentro da aplicação e o que cada um contém. Para realizar o uso dessa funcionalidade utilize a seguinte linha de comando em seu terminal:

```bash
npm run analyzer
```

Você poderá navegar por cada arquivo em uma aplicação totalmente visual e verificar se algo está errado.