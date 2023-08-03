<h1 align="center"> API Node.js - Projeto de extensão Unisul</h1>

<p>O objetivo dessa API é fornecer a estrutura de back-end para o website do projeto e para determinadas funcionalidades do chatbot.</p>

* [Código do front-end do website mesmo projeto](https://github.com/TayDias/AppVulSocial_frontend-React-Typescript-MobileFirst)
* [Código do chatbot do mesmo projeto](https://github.com/TayDias/Chatbot-Grace---BLiP-Chat)


# Índice

* [Status do projeto](#Status-do-projeto)
* [Tecnologias utilizadas](#Tecnologias-utilizadas)
* [Endpoints](#Endpoints)
* [Configuração do ambiente de teste](#Configuração-do-ambiente-de-teste)
* [Referências](#Referências)


# Status do projeto

:heavy_check_mark: Finalizado :heavy_check_mark:


# Tecnologias utilizadas

- [Node.ai](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)
- [Typescript](https://www.typescriptlang.org)
- [Express](https://expressjs.com/pt-br/)
- [EJS](https://ejs.co)
- [NestJS](https://nestjs.com)
- [Nodemailer](https://nodemailer.com/about/)
- [Rxjs](https://rxjs.dev/guide/installation)
- [Knex.js](https://knexjs.org)

## Outros módulos Npm

- [cors](https://www.npmjs.com/package/cors)
- [crypto-ts](https://www.npmjs.com/package/crypto-ts)
- [mysql](https://www.npmjs.com/package/mysql)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [dotenv-safe](https://www.npmjs.com/package/dotenv-safe)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [node-pre-gyp](https://www.npmjs.com/package/node-pre-gyp)
- [reflect-metadata](https://www.npmjs.com/package/reflect-metadata)

# Endpoints

<table>
  <thead>
    <th>Endpoint</th>
    <th>Método</th>
    <th>Conteúdo</th>
    <th>Tipo</th>
    <th>Finalidade</th>
  </thead>
  <body>
    <tr>
      <td>/rescuers</td>
      <td>Get</td>
      <td>N/A</td>
      <td>N/A</td>
      <td>Listagem de todos os atendentes cadastrados</td>
    </tr>
    <tr>
      <td>/specialties</td>
      <td>Get</td>
      <td>N/A</td>
      <td>N/A</td>
      <td>Listagem das especializações cadastradas</td>
    </tr>
    <tr>
      <td>/rescuers/:id</td>
      <td>Get</td>
      <td>id: inteiro</td>
      <td>Referência</td>
      <td>Listagem dos dados de um atendente específico</td>
    </tr>
    <tr>
      <td>/rescuers</td>
      <td>Post</td>
      <td>{ name: texto, phone: texto,password:texto, email: texto, bio: texto, specialty_id:inteiro, schedules: { week_day: inteiro, from: inteiro, to: inteiro, rescuer_id: inteiro } }</td>
      <td>Corpo (JSON)</td>
      <td>Cadastro de um novo atendente</td>
    </tr>
    <tr>
      <td>/rescuers</td>
      <td>Put</td>
      <td>{ action: texto, available:inteiro, rescuer_id:inteiro }</td>
      <td>Corpo(JSON)</td>
      <td>Habilitação ou desabilitação do atendente</td>
    </tr>
    <tr>
      <td>/rescuers</td>
      <td>Delete</td>
      <td>id: inteiro</td>
      <td>Parâmetro</td>
      <td>Exclusão de um usuário atendente</td>
    </tr>
    <tr>
      <td>/schedules</td>
      <td>Get</td>
      <td>N/A</td>
      <td>N/A</td>
      <td>Listagem de todos os horários de atendimento</td>
    </tr>
    <tr>
      <td>/schedules</td>
      <td>Post</td>
      <td>{ rescuer_id:inteiro, schedules: { week_day: inteiro, from: inteiro, to: inteiro, rescuer_id: inteiro } }</td>
      <td>Corpo (JSON)</td>
      <td>Cadastro de novos horários de atendimento.</td>
    </tr>
    <tr>
      <td>/schedules</td>
      <td>Put</td>
      <td>{ id: inteiro, week_day: inteiro, from: inteiro, to: inteiro }</td>
      <td>Corpo (JSON)</td>
      <td>Alteração de horários de atendimento</td>
    </tr>
    <tr>
      <td>/schedules</td>
      <td>Delete</td>
      <td>id: inteiro</td>
      <td>Parâmetro</td>
      <td>Exclusão de um horário de atendimento</td>
    </tr>
    <tr>
      <td>/nextschedules</td>
      <td>Get</td>
      <td>N/A</td>
      <td>N/A</td>
      <td>Listagem dos próximos três horários de atendimento</td>
    </tr>
    <tr>
      <td>/availability</td>
      <td>Get</td>
      <td>N/A</td>
      <td>N/A</td>
      <td>Verificar se há horários de atendimento em andamento no momento</td>
    </tr>
    <tr>
      <td>/vulnerable</td>
      <td>Get</td>
      <td>N/A</td>
      <td>N/A</td>
      <td>Listagem de todos pessoas cadastradas pelo chatbot</td>
    </tr>
    <tr>
      <td>/vulnerable</td>
      <td>Post</td>
      <td>{ name: texto, phone: texto, nickname:texto, address: texto }</td>
      <td>Corpo (JSON)</td>
      <td>Cadastro de um novo usuário da rede vulnerável</td>
    </tr>
    <tr>
      <td>/help</td>
      <td>Get</td>
      <td>location: texto</td>
      <td>Parâmetro</td>
      <td>Listagem das perguntas cadastradas para o FAQ de um local</td>
    </tr>
    <tr>
      <td>/faq</td>
      <td>Get</td>
      <td>N/A</td>
      <td>N/A</td>
      <td>Listagem de todas as perguntas de FAQ</td>
    </tr>
    <tr>
      <td>/faq/:id</td>
      <td>Get</td>
      <td>id: inteiro</td>
      <td>Referência</td>
      <td>Listagem dos dados de uma pergunta de FAQ específica</td>
    </tr>
    <tr>
      <td>/faq</td>
      <td>Post</td>
      <td>{ url: texto, title: texto, desc: texto, location: texto }</td>
      <td>Corpo (JSON)</td>
      <td>Cadastro de uma nova pergunta de FAQ</td>
    </tr>
    <tr>
      <td>/faq</td>
      <td>Put</td>
      <td>{ id: inteiro, url: texto, title: texto, desc: texto, location: texto }</td>
      <td>Corpo (JSON)</td>
      <td>Alteração de uma pergunta de FAQ</td>
    </tr>
    <tr>
      <td>/faq</td>
      <td>Delete</td>
      <td>id: inteiro</td>
      <td>Parâmetro</td>
      <td>Exclusão de uma pergunta de FAQ</td>
    </tr>
    <tr>
      <td>/login</td>
      <td>Post</td>
      <td>{ email: texto, senha: texto }</td>
      <td>Corpo (JSON)</td>
      <td>Autenticação de usuários</td>
    </tr>
    <tr>
      <td>/sendSchedules</td>
      <td>Post</td>
      <td>{ email: texto }</td>
      <td>Corpo (JSON)</td>
      <td>Envio de futuros horários de atendimento por e-mail</td>
    </tr>
    <tr>
      <td>/sendFeedback</td>
      <td>Post</td>
      <td>{ autor: texto, motivo: texto, feedback: texto }</td>
      <td>Corpo (JSON)</td>
      <td>Envio de feedback do chatbot para o e-mail do projeto</td>
    </tr>
  </body>
</table>


# Configuração do ambiente de teste

## Pré-requisitos

- **Node.js** versão 4 ou superior;
- **Yarn** - `npm install --global yarn`.
- **Nodemon** - `npm i -g nodemon`.

## Instalação

1. Faça o clone do repositório e no terminal navegue até a pasta.
2. Abra o seu editor de código e instale as dependências do projeto com `npm install`. O código foi desenvolvido no [Visual Studio Code](https://code.visualstudio.com).
3. Configure uma conexão no seu gerenciador de dados MySQL, depois edite o arquivo `/src/database/connection.ts` e adicione as suas próprias configurações de conexão.
4. Crie a estrutura de tabelas rodando o script `/src/database/scriptDB.sql` no seu gerenciador de dados ou então rodando as Migrations e as Seeds na pasta do projeto com os comandos `npm run knex:migrate` e `npm run knex:seed`.
5. Rode o servidor de desenvolvimento com `npm run dev`.


# Referências

Allow multiple CORS domain in express js:
https://stackoverflow.com/questions/26988071/allow-multiple-cors-domain-in-express-js

Autenticação JSON Web Token (JWT) em Node.js:
https://www.luiztools.com.br/post/autenticacao-json-web-token-jwt-em-nodejs/

Como fazer um README.md BONITÃO:
https://raullesteves.medium.com/github-como-fazer-um-readme-md-bonitão-c85c8f154f8

Como o setor jurídico e a TI podem trabalhar juntos para adaptar a empresa à LGPD?:
https://www.meupositivo.com.br/panoramapositivo/adaptar-a-empresa-a-lgpd/

CORS in Express using TypeScript:
https://brianflove.com/2017-03-22/express-cors-typescript/

Emoji-cheat-sheet:
https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md

How to find what node version a project supports:
https://stackoverflow.com/questions/42805913/how-to-find-what-node-version-a-project-supports

RESTful com Node.js, Restify e MySQL:
https://github.com/farnetani/exemplo-restful-nodejs/blob/master/README.md

TCC - DESENVOLVIMENTO DE UM CHATBOT PARA APOIO A VÍTIMAS DE VIOLÊNCIA DOMÉSTICA:
https://repositorio.animaeducacao.com.br/bitstream/ANIMA/23997/1/TCC-Final-Taynara-Dias.pdf

Youtube da Rocketseat:
https://www.youtube.com/@rocketseat
