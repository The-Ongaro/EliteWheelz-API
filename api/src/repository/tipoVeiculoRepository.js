import { conexao } from "./connection.js";

export async function cadastrarTipo(veiculo) {
    const comando =
    `INSERT INTO tb_tipo_veic (ds_tipo)
	            VALUES (?)`

    const [resposta] = await conexao.query(comando, [veiculo.tipo]);
    veiculo.id = resposta.insertId;
    return veiculo;
}

export async function listarTipos() {
    const comando =
    `SELECT id_tipo_veic       as Id,
            ds_tipo            as Tipo
                FROM tb_tipo_veic`

    const [resposta] = await conexao.query(comando);
    return resposta;
}

export async function deletarTipo(id) {
    const comando =
    `DELETE FROM tb_tipo_veic
        WHERE id_tipo_veic = ?`

    const [resposta] = await conexao.query(comando, [id]);
    return resposta.affectedRows;
}