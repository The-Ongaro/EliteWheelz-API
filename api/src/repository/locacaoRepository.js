import { conexao } from "./connection.js";

export async function inserirVeiculo(veiculo) {
    const comando = 
    `INSERT INTO tb_locacao (id_tipo_veic, ds_modelo, ds_marca, nr_ano, ds_placa)
            VALUES (?, ?, ?, ?, ?)`

    const [resposta] = await conexao.query(comando, [veiculo.tipo, veiculo.modelo, veiculo.marca, veiculo.ano, veiculo.placa]);
    veiculo.id = resposta.insertId;
    return veiculo;
}

export async function listarVeiculo() {
    const comando = 
    `SELECT tb_locacao.id_veiculo 	        as id,
            tb_tipo_veic.id_tipo_veic       as TipoID,
                        ds_modelo 	        as modelo, 
                        ds_marca  	        as marca, 
                        nr_ano	 	        as ano, 
                        ds_tipo   	        as tipo, 
                        ds_placa  	        as placa
                            FROM tb_locacao
                                INNER JOIN tb_tipo_veic ON tb_tipo_veic.id_tipo_veic = tb_locacao.id_tipo_veic
                                    ORDER BY id_veiculo`

    const [resposta] = await conexao.query(comando);
    return resposta;
}

export async function alterarVeiculo(id, veiculo) {
    const comando = 
    `UPDATE tb_locacao
        SET id_tipo_veic = ?,
            ds_modelo 	 = ?,
            ds_marca 	 = ?,
            nr_ano 		 = ?,
            ds_placa 	 = ?
        WHERE id_veiculo = ?`

    const [resposta] = await conexao.query(comando, [veiculo.tipo, veiculo.modelo, veiculo.marca, veiculo.ano, veiculo.placa, id]);
    return resposta.affectedRows;
}

export async function buscarPorNMP(modelo, marca, placa) {
    const comando = 
    `SELECT id_veiculo      as Id,
            ds_modelo       as Modelo, 
            ds_marca        as Marca, 
            nr_ano          as Ano, 
            ds_tipo         as Tipo, 
            ds_placa        as Placa  
            FROM tb_locacao
                INNER JOIN tb_tipo_veic ON tb_tipo_veic.id_tipo_veic = tb_locacao.id_tipo_veic
                    WHERE ds_modelo LIKE ? 
                       OR ds_marca  LIKE ? 
                       OR ds_placa  LIKE ?`

    const [resposta] = await conexao.query(comando, ['%' + modelo + '%', '%' + marca + '%', '%' + placa + '%']);
    return resposta;
}

export async function buscarPlaca(placa) {
    const comando =
    `SELECT id_veiculo      as Id,
            ds_modelo       as Modelo, 
            ds_marca        as Marca, 
            nr_ano          as Ano, 
            ds_tipo         as Tipo, 
            ds_placa        as Placa  
            FROM tb_locacao
                INNER JOIN tb_tipo_veic ON tb_tipo_veic.id_tipo_veic = tb_locacao.id_tipo_veic
                    WHERE ds_placa LIKE ? `

    const [resposta] = await conexao.query(comando, [placa]);
    return resposta;
}

export async function deletarVeiculo(id) {
    const comando = 
    `DELETE FROM tb_locacao
	        WHERE id_veiculo = ?`
    
    const [resposta] = await conexao.query(comando, [id]);
    return resposta.affectedRows;
}
