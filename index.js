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

app.get('/clientes', async(req, res) => {
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM clientes'); //faz a consulta no banco de dados
    conn.release();
    res.json(rows);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); // Faz o servidor rodar na porta 3000