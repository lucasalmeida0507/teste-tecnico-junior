# TESTE TECNICO JUNIOR 

Codigo em Python com a simples funcionalidade de cadastrar, listar, atualizar e deletar clientes/usuários.

# TECNOLOGIAS INTEGRADAS NO PROJETO

<img width="897" height="126" alt="image" src="https://github.com/user-attachments/assets/d0d75857-a9d0-4d17-9e43-f5a2a6d2892a" />


- Node.JS = Gerenciamento de users/lógica em Typescript;
- Python = Rotas da API (FastAPI), consulta de notificações;
- PostgreSQL = Base do banco de dados não relacionais seguros;
- Prisma ORM = contém a tabela do banco de dados, construção e distinção dos dados como: number, string, boolean, date, etc;
- Docker = Conteinirização das funcionalidades, podendo ser executada nos 3 sistemas operacionais (Windows, IOS e Linux).

# ARQUITETURA

- DATABASE = Banco de dados;
- NODE-API = Introdução, edição e exclusão de dados;
- PYTHON-API = Consulta dados e notificações.

# EXECUÇÃO

<strong>INSTALAÇÃO<strong>

Acesse o link: https://github.com/lucasalmeida0507/teste-tecnico-junior

clique no botão Code, Codespaces, +, instale as extenções no ambiente Vscode. Aguarde o carregamento dos arquivos, certifique-se de que seu ambiente VScode tenha as seguintes extensões instaladas:

<img width="300" height="590" alt="image" src="https://github.com/user-attachments/assets/668cd8bc-25cf-46a1-88c9-da6a6feeab08" />


- Conteiners
- Docker
- Postman



Abra um novo terminal e digite:

<img width="771" height="384" alt="image" src="https://github.com/user-attachments/assets/c1e5d258-2863-4d53-a914-1dc6b57171e0" />


docker compose down para se assegurar que não haja containers em execução <img width="620" height="190" alt="image" src="https://github.com/user-attachments/assets/d0407f1c-aa87-4ac1-b42d-71ed18e8b3fe" />
 e posteriormente use o comando: docker compose up --build

<img width="2215" height="312" alt="image" src="https://github.com/user-attachments/assets/59d8f230-bf9b-4a5c-8fbb-db2d4fb6b5b0" />


aguarde o alert: O aplicativo em execução na porta 3000 está disponível.

Vá no Postman e clique em Sign In, clique em abrir, realize um cadastro/selecione seu login e depois em abrir.

<img width="440" height="465" alt="image" src="https://github.com/user-attachments/assets/89b780f8-79e4-4cf9-bd17-82ea1e189f20" />
<img width="423" height="494" alt="image" src="https://github.com/user-attachments/assets/9a0a7752-c373-4747-9433-5fa14c3d95c4" />
</div>

- Clique no canto inferior da div: use authorization token to sign in.

<img width="383" height="397" alt="image" src="https://github.com/user-attachments/assets/ac2c89cf-5f85-4bac-a674-720c3e233953" />

- Clique em "Copy Token", retorne ao ambiente virtual do VScode e clique em "Enter authorization token" e cole o Token.

<img width="450" height="255" alt="image" src="https://github.com/user-attachments/assets/cad933bf-4887-4a29-966f-60fcc8878563" />
<img width="437" height="519" alt="image" src="https://github.com/user-attachments/assets/1579c872-f4ee-4156-ad61-1731bbe2128d" />
<img width="631" height="119" alt="image" src="https://github.com/user-attachments/assets/e95e4397-719b-4d43-8631-091a977bffd7" />



- Clique em "New HTTP Request" e cole no "Enter URL or paste text": http://localhost:3000/users, selecione Body e Raw, selecione o text "Json" e cole:

{
  "name": "Lucas Almeida",
  "email": "lucas@exemplo.com",
  "phone": "11988887777",
  "notificationEnabled": true
}

<img width="652" height="311" alt="image" src="https://github.com/user-attachments/assets/0dafa52e-c9dc-40c2-a468-f5c09e38928b" />

Para especificar usuários, execute o seguinte comando: http://localhost:300/users/id

selecione as seguintes opções para seguintes comandos para testes:

POST = criar 
GET = exibir/ listar 
PUT = editar/atualizar 
DELETE = remover 

<img width="682" height="255" alt="image" src="https://github.com/user-attachments/assets/f8992e37-547d-4fb7-998e-2ae3032d1132" />


# OBSERVAÇÃO: Caso ocorra o seguinte erro:

<img width="303" height="252" alt="image" src="https://github.com/user-attachments/assets/8565e629-5547-4b25-96c7-ac102a795f71" />

- Execute o <strong>docker compose down<strong/> e depois o execute o docker compose up --build


Apos cada movimentação, o STATUS vai nos retornar as seguintes informações: 

- 201 Created 
- 200 OK
- 404 Not Found

<img width="283" height="34" alt="image" src="https://github.com/user-attachments/assets/d64da666-2f29-43d0-a442-9a398d26134b" />

# CONCLUSÃO

De início, havia enfrentado barreiras para executar o projeto teste, pois realizei estudos intermitentes sobre Docker e durante a tentativa de instalação so Software e configuração da máquina, meu Windows foi corrompido. Ato contínuo, realizei a formatação do meu PC ocasionando na perda de quase todo material didático do qual eu havia agregado desde meu ingresso academico na tecnologia. Fui resiliente e busquei soluções alternativas sem a necessidade de comprometer meu setup. Contudo, pude aprender mais sobre Beck End e trazer enfase no que entendia sobre Docker. O projeto tras uma proposta simples e funcional, para uso diário voltado para clientes e usuários, procurei ser o mais didático possivel na documentação para facilitar o entendimento sobre a ferramenta. Estou aberto a sugestões e críticas construtivas.
