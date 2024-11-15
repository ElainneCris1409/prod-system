const express = require('express'); //busca o pacote do express
const mysql = require('mysql2/promise')
const app = express();  // Chama a função com tudo do express para o 


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

//Clientes

app.use(express.json()); //serve para o express entender que o corpo (body) da requisição é um JSON

app.use(express.urlencoded({extended: true}));// serve para o express entender que o corpo (body) da requisição é um formulário

app.get('/clientes', async(req, res) => { //cria a rota /clientes (req: igual a request que chama o backend, res: igual a response que o backend retorna para o frontend) com o método GET para buscar todos os clientes no banco de dados  
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM clientes'); //faz a consulta no banco de dados
    conn.release();
    res.json(rows);
});
app.post('/clientes', async(req, res) => { //cria a rota /clientes com o método POST para inserir um novo cliente no banco de dados
    const {nome, email, telefone, endereco} = req.body;
    const conn = await pool.getConnection();
    await conn.query('INSERT INTO clientes (nome, email, telefone, endereco) VALUES (?, ?, ?, ?)', [nome, email, telefone, endereco]);
    conn.release();
    res.json();
});
app.put('/clientes', async(req, res) => { //cria a rota /clientes com o método PUT para atualizar um cliente no banco de dados
    const {nome, email, telefone, endereco,id } = req.body;
    const conn = await pool.getConnection();
    await conn.query('UPDATE clientes SET nome = ?, email = ?, telefone = ?, endereco = ? WHERE cliente_id = ?', [nome, email, telefone, endereco,id]);
    conn.release();
    res.json();
});
app.get('/clientes/:id', async(req, res) => { //cria a rota /clientes/:id com o método GET para buscar um cliente específico no banco de dados  
    const {id} = req.params;
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM clientes WHERE cliente_id = ?', [id]);
    conn.release();
    res.json(rows);
});
/**
 * Deletar um cliente
 * Para deletar foi inserido um cliente inexistente na base de dados, com o ID chamamaos esse Id no postman para o delete e confirmamos no mysql com o select de clientes. 
 */
app.delete('/clientes/:id', async(req, res) => { //cria a rota /clientes/:id com o método DELETE para deletar um cliente específico no banco de dados
    const {id} = req.params;
    const conn = await pool.getConnection();
    try {
        await conn.query('DELETE FROM clientes WHERE cliente_id = ?', [id]);
    } catch (error) {
        res.status(500).send('Erro ao deletar o cliente');
    }
    conn.release();
    res.json();
}); 

//Produtos

app.get('/produtos', async(req, res) => { //cria a rota /produtos com o método GET para buscar todos os produtos no banco de dados  
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM produtos'); //faz a consulta no banco de dados
    conn.release();
    res.json(rows);
});

app.post('/produtos', async(req, res) => { //cria a rota /produtos com o método POST para inserir um novo produto no banco de dados 
    const {nome, descricao, preco, estoque} = req.body;
    const conn = await pool.getConnection();
    await conn.query('INSERT INTO produtos (nome, descricao, preco, estoque) VALUES (?, ?, ?, ?)', [nome, descricao, preco, estoque]);
    conn.release();
    res.json();
});

app.put('/produtos', async(req, res) => { //cria a rota /produtos com o método PUT para atualizar um produto no banco de dados
    const {nome, descricao, preco, estoque, produto_id} = req.body;
    const conn = await pool.getConnection();
    await conn.query('UPDATE produtos SET nome = ?, descricao = ?, preco = ?, estoque = ? WHERE produto_id = ?', [nome, descricao, preco, estoque,produto_id]);
    conn.release();
    res.json();
});
app.get('/produtos/:id', async(req, res) => { //cria a rota /produtos/:id com o método GET para buscar um produto específico no banco de dados
    const {id} = req.params;
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM produtos WHERE produto_id = ?', [id]);
    conn.release();
    res.json(rows);
});

app.delete('/produtos/:id', async(req, res) => { //cria a rota /produtos/:id com o método DELETE para deletar um produto específico no banco de dados   
    const {id} = req.params;
    const conn = await pool.getConnection();
    try {
        await conn.query('DELETE FROM produtos WHERE produto_id = ?', [id]);
    } catch (error) {
        res.status(500).send('Erro ao deletar o produto');
    }
    conn.release();
    res.json();
});

//Pedidos
app.get('/pedidos', async(req,res)=> {
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM pedidos'); //faz a consulta no banco de dados
    conn.release();
    res.json(rows);
});
app.get('/pedidos/:id', async(req,res)=> {
    const {id} = req.params;
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM pedidos WHERE pedido_id = ?', [id]);
    conn.release();
    res.json(rows);
});
app.post('/pedidos', async(req, res) => { 
    const {cliente_id, data_pedido, valor_total} = req.body;
    const conn = await pool.getConnection();
    await conn.query('INSERT INTO pedidos (cliente_id, data_pedido, valor_total) VALUES (?, ?, ?)', [cliente_id, data_pedido, valor_total]);
    conn.release();
    res.json();
});

app.put('/pedidos', async(req, res) => { 
    const {cliente_id, data_pedido, valor_total, pedido_id} = req.body;
    const conn = await pool.getConnection();
    try {
        await conn.query('UPDATE pedidos SET cliente_id = ?, data_pedido = ?, valor_total = ? WHERE pedido_id = ?', [cliente_id, data_pedido, valor_total, pedido_id]);
    } catch (error) {   
        res.status(500).send('Erro ao atualizar o pedido');
    }
    conn.release();
    res.json();
});

app.delete('/pedidos/:id', async(req, res) => { 
    const {id} = req.params;
    const conn = await pool.getConnection();
    try {
        await conn.query('DELETE FROM pedidos WHERE pedido_id = ?', [id]);
    } catch (error) {
        res.status(500).send('Erro ao deletar o pedido');
    }
    conn.release();
    res.json();
});

//Pedido_produtos

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); // Faz o servidor rodar na porta 3000