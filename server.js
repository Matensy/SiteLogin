// server.js
// Este é o "cérebro" do site (o back-end).
// Ele recebe o que o usuário faz nas páginas (login, cadastro) e responde.

const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const path = require("path");
const db = require("./db");

const app = express();
const PORTA = 3000;

// ----- Configurações básicas -----

// Usamos EJS pra montar as páginas (HTML que aceita pedacinhos dinâmicos).
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Deixa a pasta "public" acessível (é onde fica o CSS).
app.use(express.static(path.join(__dirname, "public")));

// Permite ler os dados enviados pelos formulários.
app.use(express.urlencoded({ extended: true }));

// Sessão: é o que faz o site "lembrar" que você está logado.
app.use(
  session({
    secret: "troque-por-um-texto-secreto-qualquer",
    resave: false,
    saveUninitialized: false,
  })
);

// "Porteiro": só deixa passar quem está logado.
// Usamos isso para proteger a página de início.
function precisaEstarLogado(req, res, next) {
  if (req.session.usuarioId) {
    return next();
  }
  res.redirect("/");
}

// ----- Rotas (as "páginas" do site) -----

// Página inicial = tela de LOGIN
app.get("/", (req, res) => {
  res.render("home", { erro: null });
});

// Recebe o formulário de login
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  // Procura o usuário pelo email. O "?" evita problemas de segurança.
  const usuario = db
    .prepare("SELECT * FROM usuarios WHERE email = ?")
    .get(email);

  // Se não achou o email, OU a senha não bate, mostra erro.
  if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
    return res.render("home", { erro: "E-mail ou senha incorretos." });
  }

  // Deu certo: guarda o usuário na sessão e manda pra área logada.
  req.session.usuarioId = usuario.id;
  req.session.usuarioNome = usuario.nome;
  res.redirect("/inicio");
});

// Página de CADASTRO
app.get("/cadastro", (req, res) => {
  res.render("cadastro", { erro: null });
});

// Recebe o formulário de cadastro
app.post("/cadastro", (req, res) => {
  const { nome, email, senha } = req.body;

  // Verificação simples: todos os campos preenchidos?
  if (!nome || !email || !senha) {
    return res.render("cadastro", { erro: "Preencha todos os campos." });
  }

  // Criptografa a senha antes de salvar (segurança básica).
  const senhaCriptografada = bcrypt.hashSync(senha, 10);

  try {
    db.prepare(
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)"
    ).run(nome, email, senhaCriptografada);
  } catch (e) {
    // O erro mais comum aqui é o email já estar cadastrado.
    return res.render("cadastro", {
      erro: "Esse e-mail já está cadastrado.",
    });
  }

  // Cadastrou: volta pra tela de login.
  res.redirect("/");
});

// Área logada (só entra quem fez login)
app.get("/inicio", precisaEstarLogado, (req, res) => {
  // Pega só o primeiro nome pra ficar mais amigável.
  const primeiroNome = req.session.usuarioNome.split(" ")[0];
  res.render("inicio", { nome: primeiroNome });
});

// Sair (logout)
app.get("/sair", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

// Liga o servidor
app.listen(PORTA, () => {
  console.log(`Servidor rodando! Abra no navegador: http://localhost:${PORTA}`);
});
