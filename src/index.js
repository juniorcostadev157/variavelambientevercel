const express = require('express');
const cors = require('cors');
const { db } = require('./firebase');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente do .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.post('/api/clientes', async (req, res) => {
  try {
    const { nome, email } = req.body;
    await db.collection('clientes').add({ nome, email });
    res.status(201).send({ message: 'Cliente cadastrado com sucesso!' });
  } catch (error) {
    res.status(500).send({ error: 'Erro ao cadastrar cliente.' });
  }
});

app.get('/api/clientes', async (req, res) => {
  try {
    const snapshot = await db.collection('clientes').get();
    const clientes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).send(clientes);
  } catch (error) {
    res.status(500).send({ error: 'Erro ao listar clientes.' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
