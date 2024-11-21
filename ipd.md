// POST /pedido-produtos quando o registro já existe.
try {
    await conn.query(
      `INSERT INTO pedido_produtos (pedido_id, produto_id, quantidade, preco_unitario)
             VALUES (?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE                   //Se o registro já existir, atualiza os campos
             quantidade = VALUES(quantidade), 
             preco_unitario = VALUES(preco_unitario)`,
      [pedido_id, produto_id, quantidade, preco_unitario]
    );
    res.json({ message: "Registro inserido ou atualizado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao processar a solicitação." });
  } finally {
    conn.release();
  }