const express = require('express'); //busca o pacote do express
const mysql = require('mysql2/promise')
const app = express();  // Chama a função com tudo do express para o app

const PORT = process.env.PORT || 3000;

/*
Criar a conexao com a base de dados
*/
const pool = mysql.createPool({
    host: 'localhost',
    user: 'tonysoprano',
    password: '12345678',
    database: 'data_dev',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.use(express.json()); //serve para o express entender que o corpo (body) da requisição é um JSON

app.use(express.urlencoded({extended: true}));// serve para o express entender que o corpo (body) da requisição é um formulário

app.get('/clientes', async(req, res) => { //cria a rota /clientes
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM clientes'); //faz a consulta no banco de dados
    conn.release();
    res.json(rows);
});
app.post('/clientes', async(req, res) => { //cria a rota /clientes com o método POST para inserir um novo cliente no banco de dados
    const {nome, email, telefone, endereco} = req.body;
    const conn = await pool.getConnection();
    const [result] = await conn.query('INSERT INTO clientes (nome, email, telefone, endereco) VALUES (?, ?, ?, ?)', [nome, email, telefone, endereco]);
    conn.release();
    res.json(result);
});
app.put('/clientes/:id', async(req, res) => { //cria a rota /clientes com o método PUT para atualizar um cliente no banco de dados
    const {nome, email, telefone, endereco, cliente_id} = req.body;
    const {id} = req.params;
    const conn = await pool.getConnection();
    const [result] = await conn.query('UPDATE clientes SET nome = ?, email = ?, telefone = ?, endereco = ? WHERE cliente_id = ?', [nome, email, telefone, endereco, cliente_id]);
    conn.release();
    res.json(result);
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); // Faz o servidor rodar na porta 3000