BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "pessoa" (
	"id_pessoa"	INTEGER NOT NULL UNIQUE,
	"nome"	TEXT,
	"foto"	TEXT,
	"endereco"	TEXT,
	"telefone"	TEXT,
	"email"	TEXT,
	"cargo"	TEXT,
	"descricao"	TEXT,
	PRIMARY KEY("id_pessoa")
);
CREATE TABLE IF NOT EXISTS "formacao" (
	"id_formacao"	INTEGER NOT NULL UNIQUE,
	"curso"	TEXT,
	"ano_inicio"	TEXT,
	"ano_termino"	TEXT,
	"descricao"	TEXT,
	"id_pessoa"	INTEGER,
	PRIMARY KEY("id_formacao"),
	FOREIGN KEY("id_pessoa") REFERENCES "pessoa"("id_pessoa")
);
CREATE TABLE IF NOT EXISTS "experiencia" (
	"id_experiencia"	INTEGER NOT NULL UNIQUE,
	"nome_empresa"	TEXT,
	"ano_inicio"	TEXT,
	"ano_termino"	TEXT,
	"cargo"	TEXT,
	"descricao"	TEXT,
	"id_pessoa"	INTEGER,
	PRIMARY KEY("id_experiencia"),
	FOREIGN KEY("id_pessoa") REFERENCES "pessoa"("id_pessoa")
);
CREATE TABLE IF NOT EXISTS "realizacoes" (
	"id_realizacoes"	INTEGER NOT NULL UNIQUE,
	"titulo"	TEXT,
	"ano"	TEXT,
	"descricao"	TEXT,
	"id_pessoa"	INTEGER,
	PRIMARY KEY("id_realizacoes"),
	FOREIGN KEY("id_pessoa") REFERENCES "pessoa"("id_pessoa")
);
CREATE TABLE IF NOT EXISTS "habilidades" (
	"id_habilidades"	INTEGER NOT NULL UNIQUE,
	"nome_habilidade"	TEXT,
	"grau_habilidade"	TEXT,
	"id_pessoa"	INTEGER,
	PRIMARY KEY("id_habilidades"),
	FOREIGN KEY("id_pessoa") REFERENCES "pessoa"("id_pessoa")
);
CREATE TABLE IF NOT EXISTS "personalidade" (
	"id_personalidade"	INTEGER NOT NULL UNIQUE,
	"nome_personalidade"	TEXT,
	"grau_personalidade"	TEXT,
	"id_pessoa"	INTEGER,
	PRIMARY KEY("id_personalidade"),
	FOREIGN KEY("id_pessoa") REFERENCES "pessoa"("id_pessoa")
);
COMMIT;
