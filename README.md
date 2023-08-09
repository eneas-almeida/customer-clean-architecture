# Customer Stone

[![NPM](https://img.shields.io/npm/l/react)](https://github.com/venzel/customer-stone/blob/master/LICENSE)

> **Customer Stone** é uma API Rest estruturada com Clean Architecture e modelagem de entidade utilizando conceitos de DDD.

## Stack

-   NodeJs/Express;
-   Typescript;
-   Docker (MongoDB, Redis);
-   Jest;

## Pacotes

```bash
yarn add express \
    agentkeepalive \
    axios \
    axios-retry \
    dotenv \
    express \
    express-async-errors \
    helmet \
    mongoose \
    morgan \
    reflect-metadata \
    uuid \
    yup

# Development
yarn add @types/express \
    @swc/cli \
    @swc/core \
    @swc/jest \
    @types/express \
    @types/jest \
    @types/morgan \
    @types/node \
    @types/uuid \
    @typescript-eslint/eslint-plugin \
    @typescript-eslint/parser \
    eslint \
    eslint-config-standard \
    eslint-plugin-import \
    eslint-plugin-n \
    eslint-plugin-promise \
    git-commit-msg-linter \
    husky \
    jest \
    lint-staged \
    ts-jest \
    tsconfig-paths \
    tscpaths \
    typescript -D
```

## Padronização de commits (Conventional Commits)

### Flags utilizadas:

| Ícone | Flag         | Descrição                                                                                                |
| ----- | ------------ | -------------------------------------------------------------------------------------------------------- |
| 🪲    | **fix**      | Correção de bug para o usuário.                                                                          |
| ☂️    | **feat**     | Desenvolvimento de uma nova funcionalidade.                                                              |
| 📃    | **docs**     | Alterações na documentação.                                                                              |
| ✂️    | **refactor** | Refatoração de um bloco de código.                                                                       |
| 💅    | **style**    | Formatação, falta de ponto e vírgula, etc.                                                               |
| 🔧    | **perf**     | Uma mudança de código que melhora o desempenho.                                                          |
| 🔨    | **build**    | Alterações que afetam o sistema de compilação ou dependências externas (escopos de exemplo: gulp e npm). |
| 🪀    | **ci**       | Alterações em arquivos e scripts de configuração de CI (escopos de exemplo: Travis, Circle e Codeship).  |
| 🧪    | **test**     | Adicionando testes ausentes ou corrigindo testes existentes.                                             |

## Pré-requisitos

-   NodeJs v18.12.1
-   Yarn 1.22.19
-   Docker version 24.0.5, build ced0996
-   docker-compose version 1.29.2, build 5becea4c
-   Make

## Como instalar o projeto

```bash
# Clona o repositório
git clone https://github.com/venzel/customer-stone.git

# Acessa a pasta do repositório clonado
cd customer-stone

# Instala os pacotes do NodeJs
make packages

# Cria o .env e edita, se for a primeira vez executando
cp -r .env.example .env

# Sobe os containers do docker
make up

# Criar o build e rodar o server
make build && make start
```

<hr />

<div>
  <img align="left" src="https://imgur.com/k8HFd0F.png" width=35 alt="Profile"/>
  <sub>Made with 💙 by <a href="https://github.com/venzel">Enéas Almeida</a></sub>
</div>
