const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const sqlite3 = require('sqlite3').verbose();
const DBPATH = './backend/DBapp_41.db';

/* Servidor aplicação */
const hostname = '127.0.0.1';
const port = 3071;
const app = express();
const upload = multer();
app.use(upload.none());
app.use(express.static("../frontend/"));
function obterColID(nome_col) {
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	var id_col = 0;
	//TODO Here we are going to query the database to get the ID corresponding to the "name_col"
	return(id_col);
};
/* Definição dos endpoints */
/******** CRUD ************/
app.use(express.json());
// Retorna todos registros (é o R do CRUD - Read)
app.get('/coletores', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	//TODO What is the SQL that is going to retrieve all the data from the colectors
  	var sql = '';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		// What is the line that returns all the rows in JSON format ? 
	});
	db.close(); // Fecha o banco
});
app.get('/protocolos', (req, res) => {
	//TODO make the code to get all the rows of the protocols
});
// Insere um registro (é o C do CRUD - Create)
app.post('/colinsert', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS	
	sql = "INSERT INTO TblColetor (ID_COLETOR, NOME_COLETOR) " + 
	                      "VALUES (" + 
						  			 //TODO how we are going to get the "id" value from the REQUEST
						             + 
						       ", '" + 
					                 //TODO how we are going to get the "name" value from the REQUEST 
							         req.body.nome 
									 + "')";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {  
			console.log("Erro de inserção:" + err);
		}
	});
	db.close(); // Fecha o banco
	res.end();
});
// Insere um registro (é o C do CRUD - Create)
app.post('/protinsert', urlencodedParser, (req, res) => {
	//TODO Now creat the code to insert in the TbPROTOCOLO table
});
// Insere um registro (é o C do CRUD - Create)
app.post('/protinsertcol', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	//TODO the following line calls the above function based on the "COLETOR's name"
	var idcol = obterColID(req.body.nome_col);	
	sql = "INSERT INTO TblPROTOCOLO (ID_PROTOCOLO,ID_COLETOR, NOME_PROTOCOLO) " + 
		//TODO Create the "VALUES" part of the INSERT. Pay attention that some values will come from the REQUEST plus the idcol above
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	db.close(); // Fecha o banco
	res.end();
});
// Atualiza um registro (é o U do CRUD - Update)
app.post('/colupdate', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	//TODO create teh sql command that will update the COLECTOR's Name based on an id passed on the request
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); // Fecha o banco
});
// Exclui um registro (é o D do CRUD - Delete)
app.post('/coldelete', urlencodedParser, (req, res) => {
	//TODO complete the rest of the code to delete the COLETOR
	// ...	
	sql = "DELETE FROM TblColetor WHERE ID_COLETOR = " + req.body.id;
    // ...
});
// Exclui um registro (é o D do CRUD - Delete)
app.post('/coldelete_nome', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	sql = "DELETE FROM TblColetor WHERE NOME_COLETOR = '" 
			+ 
			//TODO How we pass here the name of the COLETOR ? 
			+ 
			"'";
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); // Fecha o banco
});
// Exclui um registro (é o D do CRUD - Delete)
app.post('/protdelete', urlencodedParser, (req, res) => {
	//PUT the code to delete a PROTOCOLO of a certain  "id_prot"
});
app.post('/protdeletecol', urlencodedParser, (req, res) => {
	//TODO complete the code to delete all the PROTOCOLOs of a certain COLETOR name
	var idcol = obterColID(req.body.nome_col);	
	// ...

});
/* Servidor aplicação */
app.listen(port, hostname, () => {
  console.log("Endpoints:");
  console.log(`Page server running at http://${hostname}:${port}/coletores`);
  console.log(`Page server running at http://${hostname}:${port}/protocolos`);
  console.log(`Page server running at http://${hostname}:${port}/colinsert`);
  console.log(`Page server running at http://${hostname}:${port}/colupdate`);
  console.log(`Page server running at http://${hostname}:${port}/coldelete`);
  console.log(`Page server running at http://${hostname}:${port}/protinsert`);
  console.log(`Page server running at http://${hostname}:${port}/protinsertcol`);
  console.log(`Page server running at http://${hostname}:${port}/protdelete`);
  console.log(`Page server running at http://${hostname}:${port}/protdeletecol`);
});