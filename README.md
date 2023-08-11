# Customer API

[![NPM](https://img.shields.io/npm/l/react)](https://github.com/venzel/customer-api/blob/master/LICENSE)

> **Customer API** é uma API Rest estruturada com Clean Architecture e modelagem de entidade utilizando conceitos de DDD.

## Stack

-   NodeJs/Express;
-   Typescript;
-   Docker (MongoDB, Redis);
-   Jest;

## Arquitetura

<img src="./media/clean-architecture.png" />

## Técnicas utilizadas

-   👉 [Modelagem do domínio (DDD)](./src/domain/customer);
-   Desenvolvimento guiado a contratos;
-   👉 [Tratamento de exceções personalizados utilizando middlewares](./src/main/middlewares/exception.ts);
-   👉 [Notification pattern para validação de entidades](./src/domain/@shared/notification/notification.ts);
-   👉 [Adapter pattern para o express](./src/main/adapters/controllers/customer-controller.adapter.ts);
-   Barrel pattern para agilidade na importação dos pacotes e clareza do código;
-   👉 [Factory pattern para criar a árvore de depedências (injection/invesion dependecy)](./src/main/factories/customer-controller.factory.ts);
-   👉 [Build pattern para configurar o entrypoint da aplicação](./src/main/index.ts);
-   DTO;
-   👉 [Data Mapper pattern para realizar as conversões de dados, técnica bastante utilizada no java](./src/infra/mappers//customer.mapper.ts);
-   Fail first;
-   👉 [Estratégia de resiliência de chamadas http com o **axios retry**](./src/commons/clients/axios-http.client.ts);
-   👉 [Estratégia de melhor gerencimanto do pool de conexões com o **agentkeepalive**](./src/commons/clients/axios-http.client.ts);
-   Proxy pattern, utilizando o redis para verificar se já existe um token gerado em memória
-   TDD
-   Testes de unidade utilizando mocks, poderia ter utilizado fakes, mas fiz a opção de utilizar mocks configurado com métricas de coverage;
-   Indexes nas collections do mongo;
-   Utilização do linter para padronizar o código;
-   Utilização do pacote swc para transpilação mais rápida;
-   Docker-compose para criaçãod dos containers mongo e redis;
-   Modelagem da camada de providers para ilustração como acessar as camadas externas da aplicação;
-   Makefile para criar aliases de command line;
-   Padronização de commits (conventional commits);

## Não utilizei

-   Injeções de dependência com decorators com biblioteca, a exemplo da da tsyringe, pois, acredito que as notações tornam as aplicações mais dependente. Outro motivo é o fato do Golang não possuir notações, dessa forma, não seria possível replicar o mesmo contexto na tecnologia Go.

## O que poderia utilizar

-   Além da técnica de http retry, outra técnica resiliência a exemplo do RateLimit;
-   Swagger para documentar a aplicação;
-   Loggers;
-   Testes com Fakes em memória para deixar o código mais limpo;
-   Strategy pattern para o chaveamento de providers.

## Etapas de desenvolvimento

-   Criação do setup inicial (package.json, eslint, jest, swc, makefile)
-   Camadas:
    -   domain
    -   main (entrypoint da aplicação)
    -   commons
    -   infra/providers
    -   infra/mappers
    -   usecase/customer
    -   infra/database
    -   main/adapters/controllers
    -   main/factories

## Endpoints

### Autenticação

| URI                                                                                                                                         | Método                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Endpoint                                                                                                                                    | /auth/realms/careers/protocol/openid-connect/token                                                                                                                                                                                                                                                                                                                                                                                 |
| Method                                                                                                                                      | POST                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Header                                                                                                                                      | Content-Type: application/x-www-form-urlencoded                                                                                                                                                                                                                                                                                                                                                                                    |
| Request<br /><br /><br /><br /><br /><br />                                                                                                 | grant_type<br />client_id<br />client_secret<br />username<br />password<br />scope                                                                                                                                                                                                                                                                                                                                                |
| Response<br /><br /><br /><br /><br /><br /><br />                                                                                          | access_token<br />expires_in<br />refresh_expires_in<br />token_type<br />not-before-policy<br />scope<br />id_token                                                                                                                                                                                                                                                                                                               |
| &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; |

## Endpoints

| URI                   | Método | Token | Role | Descrição           |
| --------------------- | ------ | ----- | ---- | ------------------- |
| **CUSTOMERS**         |
| api/v1/customers      | POST   |       | ALL  | Cria o customer     |
| api/v1/customers/{id} | PATCH  |       | ALL  | Atualiza o customer |
| api/v1/customers/{id} | GET    |       | ALL  | Obtém um customer   |

### Body das requisições

#### Criar um customer

```bash
# api/v1/customers (POST)
{
  "document": 202020,
  "name": "Tiago Mattos"
}
```

#### Atualizar um customer

```bash
# api/v1/customers (PATCH)
{
  "document": 202020,
  "name": "Tiago Mattos Alencar"
}
```

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
git clone https://github.com/venzel/customer-api.git

# Acessa a pasta do repositório clonado
cd customer-api

# Instala os pacotes do NodeJs
make packages

# Cria o .env e edita, se for a primeira vez executando
cp -r .env.example .env

# Sobe os containers do docker
make up

# Criar o build e rodar o server
make build && make start
```

## Testes de unidade

<img src="./media/testes.png" />

## Como rodar os testes

```bash
make teste
```

<hr />

<div>
  <img align="left" src="https://imgur.com/k8HFd0F.png" width=35 alt="Profile"/>
  <sub>Made with 💙 by <a href="https://github.com/venzel">Enéas Almeida</a></sub>
</div>
