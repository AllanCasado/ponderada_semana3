const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const dbConfig = {
  host: 'endpoint',
  user: 'usuario',
  password: 'senha',
  database: 'nome-do-db'
};

const dbConnection = mysql.createConnection(dbConfig);
dbConnection.connect();

app.post('/cadastrar', (req, res) => {
  const { nome, categoria, preco, quantidade } = req.body;
  const query = 'INSERT INTO produtos (nome, categoria, preco, quantidade) VALUES (?, ?, ?, ?)';

  dbConnection.query(query, [nome, categoria, preco, quantidade], (error, result) => {
    if (error) {
      console.error('Erro ao cadastrar produto:', error);
      res.status(500).send('Erro ao cadastrar produto');
    } else {
      res.status(201).send('Produto cadastrado com sucesso');
    }
  });
});

app.get('/listar', (req, res) => {
  const query = 'SELECT id, nome, categoria, preco, quantidade FROM produtos';

  dbConnection.query(query, (error, results) => {
    if (error) {
      console.error('Erro ao listar produtos:', error);
      res.status(500).send('Erro ao listar produtos');
    } else {
      res.json(results);
    }
  });
});

app.delete('/deletar/:id', (req, res) => {
  const productId = req.params.id;
  const query = 'DELETE FROM produtos WHERE id = ?';

  dbConnection.query(query, [productId], (error, result) => {
    if (error) {
      console.error('Erro ao deletar produto:', error);
      res.status(500).send('Erro ao deletar produto');
    } else {
      res.status(200).send('Produto deletado com sucesso');
    }
  });
});

app.put('/editar/:id', (req, res) => {
  const productId = req.params.id;
  const { nome, categoria, preco, quantidade } = req.body;
  const query = 'UPDATE produtos SET nome = ?, categoria = ?, preco = ?, quantidade = ? WHERE id = ?';

  dbConnection.query(query, [nome, categoria, preco, quantidade, productId], (error, result) => {
    if (error) {
      console.error('Erro ao editar produto:', error);
      res.status(500).send('Erro ao editar produto');
    } else {
      res.status(200).send('Produto editado com sucesso');
    }
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
