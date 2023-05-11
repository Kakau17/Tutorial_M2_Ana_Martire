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


// Read
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


// Create
app.post('/inserepessoa', urlencodedParser, (req, res) => {
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



// Update
app.get('/atualizapessoa/update', (req, res) => {
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


app.put('/atualizapessoa/update', urlencodedParser, (req, res) => {
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



// Delete
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



app.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});