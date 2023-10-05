CREATE DATABASE locacaodb;
USE locacaodb;

-- TABELA USUARIO
CREATE TABLE tb_usuario (
id_usuario				INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nm_usuario				VARCHAR(200) NOT NULL,
ds_email				VARCHAR(200) NOT NULL,
ds_telefone				VARCHAR(200) NOT NULL,
ds_cpf					VARCHAR(200) NOT NULL,
ds_cnh					VARCHAR(200) NOT NULL
);

-- TABELA TIPO VEICULO
CREATE TABLE tb_tipo_veic (
id_tipo_veic 		    INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
ds_tipo					VARCHAR(200) NOT NULL
);

-- TABELA LOCACAO
CREATE TABLE tb_locacao (
id_veiculo				INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
id_tipo_veic			INT,
ds_modelo				VARCHAR(200) NOT NULL,
ds_marca				VARCHAR(200) NOT NULL,
nr_ano					INT NOT NULL,
ds_placa				VARCHAR(200) NOT NULL,
FOREIGN KEY (id_tipo_veic) REFERENCES tb_tipo_veic (id_tipo_veic)
);
