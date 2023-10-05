USE catalogodb;

-- TABELA USUARIOS --
-- INSERIR USUARIOS
INSERT INTO tb_usuario (nm_usuario, ds_email, ds_telefone, ds_cpf, ds_cnh)
			VALUES (?, ?, ?, ?, ?);
            
-- LSTAR TODOS OS CAMPOS DA TABELA
SELECT * FROM tb_usuario;

-- BUSCAR USUARIOS POR NOME
SELECT nm_usuario FROM tb_usuario
	WHERE nm_usuario LIKE ?;
    
-- ALTERAR CADASTRO DO USUARIO
UPDATE tb_usuario
	SET nm_usuario  = ?,
	    ds_email    = ?,
            ds_telefone = ?,
            ds_cpf	= ?,
            ds_cnh	= ?
	WHERE id_usuario = ?;
    
-- DELETAR CADASTRO USUARIO
DELETE FROM tb_usuario
	WHERE id_usuario = ?;

///////////////////////////////////////////
    
-- TABELA TIPO DE VEICULO
-- INSERIR O TIPO
INSERT INTO tb_tipo_veic (ds_tipo)
	VALUES (?);

-- LISTAR OS TIPOS DE VEICULOS
SELECT id_tipo_veic       as Id,
            ds_tipo            as Tipo
                FROM tb_tipo_veic

-- DELETAR TIPO DE VEICULO
DELETE FROM tb_tipo_veic
        WHERE id_tipo_veic = ?

///////////////////////////////////////////	

-- TABELA LOCACAO --
-- INSERIR VEICULO
INSERT INTO tb_locacao (id_tipo_veic, ds_modelo, ds_marca, nr_ano, ds_placa)
	VALUES (?, ?, ?, ?, ?);
	      
-- LISTAR VEICULOS
SELECT 	id_veiculo 	as id,
	ds_modelo 	as modelo, 
	ds_marca  	as marca, 
	nr_ano	 	as ano, 
	ds_tipo   	as tipo, 
	ds_placa  	as placa
	FROM tb_locacao
		INNER JOIN tb_tipo_veic ON tb_tipo_veic.id_tipo_veic = tb_locacao.id_tipo_veic;

-- BUSCAR VEICULOS POR MODELO, MARCA OU PLACA
SELECT 	id_veiculo 	as id,
		ds_modelo 	as modelo, 
		ds_marca  	as marca, 
		nr_ano	 	as ano, 
		ds_tipo   	as tipo, 
		ds_placa  	as placa 
		FROM tb_locacao
			INNER JOIN tb_tipo_veic ON tb_tipo_veic.id_tipo_veic = tb_locacao.id_tipo_veic
				WHERE ds_modelo = ? 
					OR ds_marca = ? 
					OR ds_placa = ?;
    
-- ALTERAR VEICULOS
UPDATE tb_locacao
	SET ds_modelo 		= ?,
	    ds_marca 		= ?,
            nr_ano 		= ?,
            ds_placa 	= ?,
            id_veiculo 	= ?
	WHERE id_veiculo 	= ?;

-- DELETAR VEICULO
DELETE FROM tb_locacao
	WHERE id_veiculo = ?;
