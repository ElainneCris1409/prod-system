INSERT INTO clientes (nome, email, telefone, endereco) VALUES
('João Silva', 'joao.silva@gmail.com', '1234-5678', 'Rua das Flores, 123'),
('Maria Souza', 'maria.souza@hotmail.com', '8765-4321', 'Av. Paulista, 456'),
('Pedro Almeida', 'pedro.almeida@yahoo.com', '5555-6666', 'Rua do Comércio, 789'),
('Ana Costa', 'ana.costa@gmail.com', '9999-8888', 'Av. das Nações, 101'),
('Carlos Pereira', 'carlos.pereira@outlook.com', '7777-8888', 'Rua da Independência, 303');

INSERT INTO produtos (nome, descricao, preco, estoque) VALUES
('Notebook Dell', 'Notebook com processador i7 e 16GB RAM', 4500.00, 10),
('Smartphone Samsung', 'Galaxy S21 com 128GB de armazenamento', 3200.00, 25),
('Câmera Canon', 'Câmera DSLR com lente 18-55mm', 2800.00, 8),
('Smart TV LG', 'Smart TV 4K 55 polegadas', 3900.00, 5),
('Fone de Ouvido JBL', 'Fone de ouvido Bluetooth', 250.00, 100);

INSERT INTO pedidos (cliente_id, data_pedido, valor_total) VALUES
(1, '2024-10-01', 4700.00),
(2, '2024-10-02', 3200.00),
(3, '2024-10-03', 6700.00),
(4, '2024-10-04', 250.00),
(5, '2024-10-05', 3900.00);

INSERT INTO pedido_produtos (pedido_id, produto_id, quantidade, preco_unitario) VALUES
(1, 1, 1, 4500.00),
(1, 5, 2, 250.00),
(2, 2, 1, 3200.00),
(3, 1, 1, 4500.00),
(3, 3, 1, 2800.00),
(4, 5, 1, 250.00),
(5, 4, 1, 3900.00);