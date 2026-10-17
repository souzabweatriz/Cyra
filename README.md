# Cyra — Inteligência de Dados

Aplicação web para importar, validar e analisar dados de clientes. O projeto foi desenvolvido na Sprint 2 de **Projeto Integrador II** e reúne um frontend em Vue 3 e uma API REST em Spring Boot.

## Entrega avaliada

| Item | Referência |
| --- | --- |
| Repositório | [github.com/souzabweatriz/Cyra](https://github.com/souzabweatriz/Cyra) |
| Branch de desenvolvimento | `Eduardo` |
| Commit de referência | [`d927681f6323263f3bffd1731a05921fd6220bee`](https://github.com/souzabweatriz/Cyra/commit/d927681f6323263f3bffd1731a05921fd6220bee) |
| Identificador curto | `d927681` — `feat: finaliza frontend da sprint 2 - atualizado` |

Para reproduzir exatamente a versão de referência após clonar o projeto:

```bash
git checkout d927681f6323263f3bffd1731a05921fd6220bee
```

> O projeto não contém senhas, tokens, chaves JWT ou connection strings reais versionados. As configurações locais são fornecidas por arquivos ignorados pelo Git.

## Funcionalidades implementadas

- Cadastro, login e manutenção de sessão do usuário com JWT.
- Proteção das telas internas no frontend e das rotas da API no backend.
- Importação de planilhas de clientes pelo navegador.
- Validação dos registros e relatório de inconsistências por linha, campo e tipo de erro.
- Envio dos registros válidos à API e persistência em PostgreSQL.
- Dashboard, relatórios e gráficos para consulta dos dados processados.

## Tecnologias

| Camada | Tecnologias |
| --- | --- |
| Frontend | Vue 3, Vite, Vue Router, Pinia, Axios e SheetJS |
| Backend | Java 21, Spring Boot 3.4.5, Spring Web, Spring Security, Validation e Spring Data JPA |
| Dados | PostgreSQL e Hibernate/JPA |
| Segurança | BCrypt, JWT (java-jwt) e CORS configurável |
| Testes | JUnit, Spring Boot Test e H2 para o perfil de testes |

## Estrutura do projeto

```text
Cyra/
├── frontend/                 # SPA Vue 3
│   ├── src/views/            # Telas e fluxos da aplicação
│   ├── src/stores/           # Estado de autenticação e importação
│   └── src/services/api.js   # Cliente HTTP e interceptor JWT
├── backend/                  # API REST Spring Boot
│   └── src/main/
│       ├── java/             # Controllers, services, segurança e entidades
│       └── resources/        # Configurações da aplicação
├── evidencias/               # Capturas de tela da execução
└── Sprints/                  # Artefatos das sprints
```

## Pré-requisitos

- Git
- Node.js 20 ou superior e npm
- Java JDK 21
- PostgreSQL 14 ou superior, em execução localmente

## Como executar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/souzabweatriz/Cyra.git
cd Cyra
git checkout d927681f6323263f3bffd1731a05921fd6220bee
```

### 2. Configure o PostgreSQL

Crie um banco vazio chamado `cyra`:

```sql
CREATE DATABASE cyra;
```

No diretório `backend/src/main/resources`, crie o arquivo `application-local.properties` a partir do modelo `application-local.properties.example` e preencha os valores locais:

```properties
DB_URL=jdbc:postgresql://localhost:5432/cyra
DB_USER=postgres
DB_PASSWORD=sua_senha
JWT_SECRET=uma_chave_secreta_com_no_minimo_32_caracteres
CORS_ORIGIN=http://localhost:5173
```

Esse arquivo é ignorado pelo Git. Ao iniciar a API, o Hibernate cria/atualiza as tabelas necessárias.

### 3. Inicie o backend

Em um terminal:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

A API estará disponível em `http://localhost:8080`.

Para executar os testes do backend:

```powershell
.\mvnw.cmd test
```

### 4. Inicie o frontend

Em outro terminal:

```powershell
cd frontend
Copy-Item .env.example .env
npm install
npm run dev
```

Abra o endereço informado pelo Vite, normalmente `http://localhost:5173`.

O arquivo `frontend/.env` é opcional quando a API estiver em `http://localhost:8080`. Para outro endereço, defina:

```properties
VITE_API_URL=http://localhost:8080
```

Para validar a compilação do frontend:

```powershell
npm run build
```

## Roteiro rápido de validação

1. Acesse `/cadastro` e crie uma conta com nome, e-mail e senha válida.
2. Faça login em `/login`; o sistema redireciona para o dashboard.
3. Acesse **Importação**, selecione uma planilha de clientes e processe-a.
4. Confira em **Relatórios** a quantidade de linhas válidas e as inconsistências encontradas.
5. Os registros válidos são enviados para `POST /api/clientes/importar` e gravados no banco.
6. Consulte **Gráficos** e **Dashboard** para visualizar os dados processados.

## API REST

| Método | Rota | Autenticação | Finalidade |
| --- | --- | --- | --- |
| `POST` | `/auth/register` | Não | Cria usuário. A senha deve ter de 8 a 72 caracteres, com letra e número. |
| `POST` | `/auth/login` | Não | Valida credenciais e retorna o token JWT. |
| `GET` | `/auth/me` | Bearer JWT | Retorna o usuário autenticado. |
| `POST` | `/api/clientes/importar` | Bearer JWT | Persiste a lista de clientes válidos importada. |

Nas requisições protegidas, envie o cabeçalho abaixo. O frontend realiza isso automaticamente pelo interceptor Axios.

```http
Authorization: Bearer <token>
```

## Segurança e configuração

- Senhas são armazenadas com hash BCrypt; nunca são retornadas pela API.
- A autenticação é stateless e o token expira em 120 minutos.
- Credenciais locais ficam em `application-local.properties`, listado no `.gitignore`.
- O frontend usa `.env` para configurações locais, também ignorado pelo Git.
- Para PostgreSQL no Azure, use uma URL JDBC com `sslmode=require` no `DB_URL`; não publique a connection string nem credenciais.

Exemplo de conexão Azure (preencha apenas no arquivo local):

```properties
DB_URL=jdbc:postgresql://<servidor>.postgres.database.azure.com:5432/<banco>?sslmode=require
DB_USER=<usuario>
DB_PASSWORD=<senha>
JWT_SECRET=<segredo-forte-com-32-ou-mais-caracteres>
```

## Evidências

As capturas de execução e interface estão na pasta [`evidencias`](./evidencias):

- [Tela inicial](./evidencias/home.png)
- [Login](./evidencias/login.png)
- [Importação de dados](./evidencias/upload.png)
- [Dashboard](./evidencias/dashboard-fullsize.png)
- [Relatórios](./evidencias/relatorios-dados-processados.png)
- [Execução do Spring Boot](./evidencias/springboot.png)

## Autoria

Projeto acadêmico desenvolvido pela equipe Cyra para a disciplina Projeto Integrador II.
