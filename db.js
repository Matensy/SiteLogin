// db.js
// Aqui a gente conecta no banco de dados (SQLite) e cria a tabela de usuários.
// O SQLite guarda tudo em um único arquivo (banco.db), então não precisa
// instalar nenhum programa de banco separado.
//
// Usamos o SQLite que JÁ VEM DENTRO do Node.js (a partir da versão 22/24),
// o "node:sqlite". Assim não precisa compilar nada nem instalar Visual Studio.
// Obs: ao rodar, o Node mostra um aviso amarelo dizendo que o recurso é
// "experimental" — isso é normal e o site funciona do mesmo jeito.

const { DatabaseSync } = require("node:sqlite");

// Abre (ou cria, se ainda não existir) o arquivo do banco.
const db = new DatabaseSync("banco.db");

// Cria a tabela de usuários caso ela ainda não exista.
// id        -> número automático que identifica cada usuário
// nome      -> nome completo
// email     -> usado pra fazer login (não pode repetir)
// senha     -> guardamos a senha JÁ CRIPTOGRAFADA (nunca o texto puro)
db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    nome  TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
  )
`);

module.exports = db;
