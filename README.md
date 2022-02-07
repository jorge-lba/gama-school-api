<h1 align="center">SCHOOL TESTS API</h1>

## 📕 Índice

- [📋 Sobre](https://www.notion.so/6912888ddd5e45ffaae4b9111d22d566)
- [🕹 Tecnologias](https://www.notion.so/6912888ddd5e45ffaae4b9111d22d566)
- [🧑🏽‍💻 Iniciando o projeto](https://www.notion.so/6912888ddd5e45ffaae4b9111d22d566)
- [👨🏽‍🔧 Contribuições](https://www.notion.so/6912888ddd5e45ffaae4b9111d22d566)
- [📝 Licença](https://www.notion.so/6912888ddd5e45ffaae4b9111d22d566)
- [🦸 Contatos](https://www.notion.so/6912888ddd5e45ffaae4b9111d22d566)

<hr>

<!-- About -->

# Sobre

Está API foi desenvolvida aplicando alguns padrões de projetos e design utilizados no **DDD** e **Arquitetura Limpa**.

Foram criadas **entidade de domínio**, **objetos de valor**, **factories**, **DTOS** entre outros.

<!-- TECHNOLOGIES -->

# Tecnologias

- [Tecnologias](https://www.notion.so/6912888ddd5e45ffaae4b9111d22d566)
    - [Node JS](https://nodejs.org/en/)
        - [TypeScript](https://www.typescriptlang.org/)
    - [Express](https://expressjs.com/pt-br/)
    - [Prisma ORM](https://www.prisma.io/)
        - [PostgresSQL](https://www.postgresql.org/)
- [Dependências](https://www.notion.so/6912888ddd5e45ffaae4b9111d22d566)
    - [Babel](https://babeljs.io/)
    - [Eslint](https://eslint.org/)
    - [Jest](https://jestjs.io/pt-BR/)
    - [Json Web Token](https://jwt.io/)

<hr>

<!-- TECHNOLOGIES -->

# Iniciando

### Pré-requisitos

- Node JS
    
    ```
    <https://nodejs.org/en/>
    
    ```
    
- Yarn ou Npm
    
    ```
    <https://yarnpkg.com/>
    
    ```
    
- PostgresSQL
    
    ```
    <https://www.postgresql.org/>
    
    ```
    

<hr>

### Instalação e uso

```
# Execute este comando para clonar o projeto
$ git clone <https://github.com/jorge-lba/gama-school-api>
# ou use a opção de download.

# Entre na pasta com
$ cd gama-school-api

# Instale as dependências
$ yarn ou npm install

# Crie o banco de dados e as tabelas utilizando o comando
$ yarn prisma migrate dev ou npm run prisma migrate

# Rode a aplicação usando o comando
$ yarn dev ou npm run dev

```
**obs.:** Para rodar o banco você pode utilizar o docker-compose com o seguinte comando
```
$ docker-compose up -d
```

### Documentação insomnia

- [http://localhost:3333/docs/](http://localhost:3333/docs/)

### Documentação swagger

- [http://localhost:3333/docs/swagger](http://localhost:3333/docs/swagger)

### Link para deploy da aplicação em uma instancia Ubuntu na Oracle Cloud

- [https://www.rahmai.xyz/docs](https://www.rahmai.xyz/docs)

### Links para plugin e repositório para gerar a documentação no insomnia
- [Insomnia Plugin Documenter](https://insomnia.rest/plugins/insomnia-plugin-documenter)
- [Insomnia Documenter](https://www.npmjs.com/package/insomnia-documenter)


<!-- LICENSE -->


# Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.
