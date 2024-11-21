CREATE TABLE clientes (
    cliente_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    endereco VARCHAR(255)
);
CREATE TABLE produtos (
    produto_id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10, 2) NOT NULL,
    estoque INT NOT NULL
);
CREATE TABLE pedidos (
    pedido_id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    data_pedido DATE NOT NULL,
    valor_total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (cliente_id) REFERENCES clientes(cliente_id)
);
CREATE TABLE pedido_produtos (
    pedido_id INT,
    produto_id INT,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (pedido_id, produto_id),
    FOREIGN KEY (pedido_id) REFERENCES pedidos(pedido_id),
    FOREIGN KEY (produto_id) REFERENCES produtos(produto_id) 
);

//Explicação para MySQL 8.0.19+
Alias (AS new): O alias new se refere aos valores que você está inserindo.

Substituir VALUES(col) por new.col: No exemplo, new.quantidade e new.preco_unitario se referem aos valores que foram inseridos na tentativa inicial.

Aplicação em Node.js
Se você estiver usando placeholders (?) no Node.js, pode ajustar o código assim:
await conn.query(
    `INSERT INTO pedido_produtos (pedido_id, produto_id, quantidade, preco_unitario)
     VALUES (?, ?, ?, ?) AS new
     ON DUPLICATE KEY UPDATE
     quantidade = new.quantidade, 
     preco_unitario = new.preco_unitario`,
    [2, 2, 1, 3.200]
);