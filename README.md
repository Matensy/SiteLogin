# 🔐 Site de Login e Cadastro

Projeto simples de **Login e Cadastro de usuários**, feito para fins de estudo.

Baseado na ideia do repositório
[TonnyThe2nd/site-Login-Cadastro](https://github.com/TonnyThe2nd/site-Login-Cadastro),
mas aqui reescrito com um back-end diferente.

## 🛠️ Tecnologias usadas

- **Front-end:** HTML + [Bootstrap 5](https://getbootstrap.com/)
- **Back-end:** [Node.js](https://nodejs.org/) com [Express](https://expressjs.com/)
- **Banco de dados:** SQLite nativo do Node (`node:sqlite`) — um único arquivo,
  não precisa instalar nem compilar nada
- **Senhas:** protegidas com `bcrypt` (nunca ficam salvas em texto puro)

## 📁 Estrutura dos arquivos

```
SiteLogin/
├─ server.js          → o back-end (onde ficam as rotas: login, cadastro...)
├─ db.js              → conexão com o banco e criação da tabela de usuários
├─ package.json       → lista de dependências do projeto
├─ views/             → as páginas do site
│  ├─ home.ejs        → tela de login
│  ├─ cadastro.ejs    → tela de cadastro
│  └─ inicio.ejs      → área que só aparece depois de logar
└─ public/css/
   └─ style.css       → estilo extra (fundo, cartão centralizado)
```

## ▶️ Como rodar o projeto

> Antes de começar, você precisa ter o [Node.js](https://nodejs.org/) instalado
> na **versão 22 ou mais nova** (o banco SQLite usado já vem embutido nessas versões).

1. Abra o terminal dentro da pasta do projeto.

2. Instale as dependências (só precisa fazer uma vez):

   ```bash
   npm install
   ```

3. Inicie o servidor:

   ```bash
   npm start
   ```

4. Abra o navegador em:

   ```
   http://localhost:3000
   ```

Pronto! A primeira vez que rodar, o arquivo `banco.db` é criado sozinho.

## 🧭 Como funciona (passo a passo)

1. Você acessa a página inicial, que é a **tela de login**.
2. Se ainda não tem conta, clica em **Cadastre-se** e cria uma.
3. Ao cadastrar, a senha é criptografada e o usuário é salvo no banco.
4. Com login e senha corretos, você entra na **área restrita** (`/inicio`).
5. Essa área só pode ser acessada por quem está logado.
6. O botão **Sair** encerra a sessão.

## 💡 Observações para quem está aprendendo

- O código tem **comentários em português** explicando cada parte.
- Usamos `?` nas consultas ao banco para evitar falhas de segurança
  (SQL Injection).
- A pasta `node_modules` e o arquivo `banco.db` **não** vão para o GitHub
  (veja o `.gitignore`).

---

Feito para estudo. Sinta-se à vontade para mexer e melhorar! 🚀
