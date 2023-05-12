const express = require('express'); 
const bodyParser = require('body-parser');
const path = require('path');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const sqlite3 = require('sqlite3').verbose();
const DBPATH = '../data/AtividadePonderada_Semana02_M2.db';

const hostname = '127.0.0.1';
const port = 3000;
const app = express();


/* Colocar toda a parte estática no frontend */
app.use(express.static("../frontend/"));


/* Definição dos endpoints */
/******** CRUD ************/
app.use(express.json());


// ***PESSOA***
// Read pessoa
app.get('/pessoa', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT * FROM pessoa';
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
});

// Insert pessoa
app.post('/pessoa', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	sql = `INSERT INTO pessoa (nome, foto, endereco, telefone, email, cargo, descricao) VALUES ('${req.body.nome}', '${req.body.foto}', '${req.body.endereco}', '${req.body.telefone}', '${req.body.email}', '${req.body.cargo}', '${req.body.descricao}')`;

	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>PESSOA INSERIDA COM SUCESSO!!! IRRA</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});

// Update pessoa
app.get('/pessoa/update', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	id_pessoa = req.query.id
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `SELECT * FROM pessoa WHERE id_pessoa = ${id_pessoa}`;
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
	res.sendFile(path.join(__dirname + "/atualizar.html"));

});

// Update pessoa
app.put('/pessoa/update', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	console.log(req.body)
	const id = req.body.id;
	const nome = req.body.nome;
	const foto = req.body.foto;
	const endereco = req.body.endereco;
	const telefone = req.body.telefone;
	const email = req.body.email;
	const cargo = req.body.cargo;
	const descricao = req.body.descricao;

	var db = new sqlite3.Database(DBPATH); // Abre o banco

	var sql = `UPDATE pessoa SET nome = '${nome}', foto = '${foto}', endereco = '${endereco}', telefone = '${telefone}', email = '${email}', cargo = '${cargo}', descricao = '${descricao}' WHERE id_pessoa = ${id};`

	console.log(sql)
	console.log('pessoa attttttualizada')

	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	
	res.redirect('/');
})

// Delete pessoa
app.delete('/pessoa/:id', (req, res) => {
	const id = req.params.id;
	
	var db = new sqlite3.Database(DBPATH);
	db.run(`DELETE FROM pessoa WHERE id_pessoa = ?`, [id], function(err) {
	  if (err) {
		console.error(err.message);
		return res.status(500).send('Erro ao excluir pessoa.');
	  }
	  console.log(`Pessoa com id ${id} excluída com sucesso.`);
	  return res.status(204).send();
	});
});


// ***FORMACAO***
// Read formacao
app.get('/formacao', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT * FROM formacao';
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
});

// Insert formacao
app.post('/formacao', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	sql = `INSERT INTO formacao (curso, ano_inicio, ano_termino, descricao, id_pessoa) VALUES ('${req.body.curso}', '${req.body.ano_inicio}', '${req.body.ano_termino}', '${req.body.descricao}', ${req.body.id_pessoa})`;

	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>FORMACAO INSERIDA COM SUCESSO!!! IRRA</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});

// Update formacao
app.get('/formacao/update', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	id_formacao = req.query.id
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `SELECT * FROM formacao WHERE id_formacao = ${id_formacao}`;
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
	res.sendFile(path.join(__dirname + "/atualizar.html"));

});

// Update formacao
app.put('/formacao/update', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	console.log(req.body)
	const id = req.body.id;
	const curso = req.body.curso;
	const ano_inicio = req.body.ano_inicio;
	const ano_termino = req.body.ano_termino;
	const descricao = req.body.descricao;
	const id_pessoa = req.body.id_pessoa;


	var db = new sqlite3.Database(DBPATH); // Abre o banco

	var sql = `UPDATE formacao SET curso = '${curso}', ano_inicio = '${ano_inicio}', ano_termino = '${ano_termino}', descricao = '${descricao}', id_pessoa = '${id_pessoa}' WHERE id_formacao = ${id};`

	console.log(sql)

	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	
	res.redirect('/');
})

// Delete formacao
app.delete('/formacao/:id', (req, res) => {
	const id = req.params.id;
	
	var db = new sqlite3.Database(DBPATH);
	db.run(`DELETE FROM formacao WHERE id_formacao = ?`, [id], function(err) {
	  if (err) {
		console.error(err.message);
		return res.status(500).send('Erro ao excluir formacao.');
	  }
	  console.log(`formacao com id ${id} excluída com sucesso.`);
	  return res.status(204).send();
	});
});


// ***EXPERIENCIA***
// Read experiencia
app.get('/experiencia', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT * FROM experiencia';
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
});

// Insert experiencia
app.post('/experiencia', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	sql = `INSERT INTO experiencia (nome_empresa, ano_inicio, ano_termino, cargo, descricao, id_pessoa) VALUES ('${req.body.nome_empresa}', '${req.body.ano_inicio}', '${req.body.ano_termino}', '${req.body.cargo}', '${req.body.descricao}', ${req.body.id_pessoa})`;

	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>EXPERIENCIA INSERIDA COM SUCESSO!!! IRRA</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});

// Update experiencia
app.get('/experiencia/update', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	id_experiencia = req.query.id
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `SELECT * FROM experiencia WHERE id_experiencia = ${id_experiencia}`;
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
	res.sendFile(path.join(__dirname + "/atualizar.html"));

});

// Update experiencia
app.put('/experiencia/update', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	console.log(req.body)
	const id = req.body.id;
	const nome_empresa = req.body.nome_empresa;
	const ano_inicio = req.body.ano_inicio;
	const ano_termino = req.body.ano_termino;
	const cargo = req.body.cargo;
	const descricao = req.body.descricao;
	const id_pessoa = req.body.id_pessoa;


	var db = new sqlite3.Database(DBPATH); // Abre o banco

	var sql = `UPDATE experiencia SET nome_empresa = '${nome_empresa}', ano_inicio = '${ano_inicio}', ano_termino = '${ano_termino}', descricao = '${descricao}', cargo = '${cargo}', id_pessoa = ${id_pessoa} WHERE id_experiencia = ${id};`

	console.log(sql)

	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	
	res.redirect('/');
})

// Delete experiencia
app.delete('/experiencia/:id', (req, res) => {
	const id = req.params.id;
	
	var db = new sqlite3.Database(DBPATH);
	db.run(`DELETE FROM experiencia WHERE id_experiencia = ?`, [id], function(err) {
	  if (err) {
		console.error(err.message);
		return res.status(500).send('Erro ao excluir experiencia.');
	  }
	  console.log(`experiencia com id ${id} excluída com sucesso.`);
	  return res.status(204).send();
	});
});


// ***REALIZACOES***
// Read realizacoes
app.get('/realizacoes', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT * FROM realizacoes';
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
});

// Insert realizacoes
app.post('/realizacoes', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	sql = `INSERT INTO realizacoes (titulo, ano, descricao, id_pessoa) VALUES ('${req.body.titulo}', '${req.body.ano}', '${req.body.descricao}', ${req.body.id_pessoa})`;

	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>REALIZACOES INSERIDAS COM SUCESSO!!! IRRA</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});

// Update realizacoes
app.get('/realizacoes/update', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	id_realizacoes = req.query.id
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `SELECT * FROM realizacoes WHERE id_realizacoes = ${id_realizacoes}`;
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
	res.sendFile(path.join(__dirname + "/atualizar.html"));

});

// Update realizacoes
app.put('/realizacoes/update', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	console.log(req.body)
	const id = req.body.id;
	const titulo = req.body.titulo;
	const ano = req.body.ano;
	const descricao = req.body.descricao;
	const id_pessoa = req.body.id_pessoa;


	var db = new sqlite3.Database(DBPATH); // Abre o banco

	var sql = `UPDATE realizacoes SET titulo = '${titulo}', ano = '${ano}', descricao = '${descricao}', id_pessoa = ${id_pessoa} WHERE id_realizacoes = ${id};`

	console.log(sql)

	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	
	res.redirect('/');
})

// Delete realizacoes
app.delete('/realizacoes/:id', (req, res) => {
	const id = req.params.id;
	
	var db = new sqlite3.Database(DBPATH);
	db.run(`DELETE FROM realizacoes WHERE id_realizacoes = ?`, [id], function(err) {
	  if (err) {
		console.error(err.message);
		return res.status(500).send('Erro ao excluir realizacoes.');
	  }
	  console.log(`realizacoes com id ${id} excluída com sucesso.`);
	  return res.status(204).send();
	});
});


// ***HABILIDADES***
// Read habilidades
app.get('/habilidades', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT * FROM habilidades';
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
});

// Insert habilidades
app.post('/habilidades', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	sql = `INSERT INTO habilidades (nome_habilidade, grau_habilidade, id_pessoa) VALUES ('${req.body.nome_habilidade}', '${req.body.grau_habilidade}', ${req.body.id_pessoa})`;

	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>HABILIDADES INSERIDAS COM SUCESSO!!! IRRA</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});

// Update habilidades
app.get('/habilidades/update', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	id_habilidades = req.query.id
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `SELECT * FROM habilidades WHERE id_habilidades = ${id_habilidades}`;
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
	res.sendFile(path.join(__dirname + "/atualizar.html"));

});

// Update habilidades
app.put('/habilidades/update', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	console.log(req.body)
	const id = req.body.id;
	const nome_habilidade = req.body.nome_habilidade;
	const grau_habilidade = req.body.grau_habilidade;
	const id_pessoa = req.body.id_pessoa;


	var db = new sqlite3.Database(DBPATH); // Abre o banco

	var sql = `UPDATE habilidades SET nome_habilidade = '${nome_habilidade}', grau_habilidade = '${grau_habilidade}', id_pessoa = ${id_pessoa} WHERE id_habilidades = ${id};`

	console.log(sql)

	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	
	res.redirect('/');
})

// Delete habilidades
app.delete('/habilidades/:id', (req, res) => {
	const id = req.params.id;
	
	var db = new sqlite3.Database(DBPATH);
	db.run(`DELETE FROM habilidades WHERE id_habilidades = ?`, [id], function(err) {
	  if (err) {
		console.error(err.message);
		return res.status(500).send('Erro ao excluir habilidades.');
	  }
	  console.log(`habilidades com id ${id} excluída com sucesso.`);
	  return res.status(204).send();
	});
});


// ***PERSONALIDADE***
// Read personalidade
app.get('/personalidade', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = 'SELECT * FROM personalidade';
		db.all(sql, [],  (err, rows ) => {
			if (err) {
				throw err;
			}
			res.json(rows);
		});
		db.close(); // Fecha o banco
});

// Insert personalidade
app.post('/personalidade', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); 
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	sql = `INSERT INTO personalidade (nome_personalidade, grau_personalidade, id_pessoa) VALUES ('${req.body.nome_personalidade}', '${req.body.grau_personalidade}', ${req.body.id_pessoa})`;

	console.log(sql);
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	res.write('<p>PERSONALIDADES INSERIDAS COM SUCESSO!!! IRRA</p><a href="/">VOLTAR</a>');
	db.close(); // Fecha o banco
	res.end();
});

// Update personalidade
app.get('/personalidade/update', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	id_personalidade = req.query.id
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var sql = `SELECT * FROM personalidade WHERE id_personalidade = ${id_personalidade}`;
	db.all(sql, [],  (err, rows ) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
	res.sendFile(path.join(__dirname + "/atualizar.html"));

});

// Update personalidade
app.put('/personalidade/update', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*');
	console.log(req.body)
	const id = req.body.id;
	const nome_personalidade = req.body.nome_personalidade;
	const grau_personalidade = req.body.grau_personalidade;
	const id_pessoa = req.body.id_pessoa;


	var db = new sqlite3.Database(DBPATH); // Abre o banco

	var sql = `UPDATE personalidade SET nome_personalidade = '${nome_personalidade}', grau_personalidade = '${grau_personalidade}', id_pessoa = ${id_pessoa} WHERE id_personalidade = ${id};`

	console.log(sql)

	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}	
	});
	
	res.redirect('/');
})

// Delete personalidade
app.delete('/personalidade/:id', (req, res) => {
	const id = req.params.id;
	
	var db = new sqlite3.Database(DBPATH);
	db.run(`DELETE FROM personalidade WHERE id_personalidade = ?`, [id], function(err) {
	  if (err) {
		console.error(err.message);
		return res.status(500).send('Erro ao excluir personalidade.');
	  }
	  console.log(`personalidade com id ${id} excluída com sucesso.`);
	  return res.status(204).send();
	});
});

app.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});