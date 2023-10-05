import { alterarVeiculo, buscarPlaca, buscarPorNMP, deletarVeiculo, inserirVeiculo, listarVeiculo } from '../repository/locacaoRepository.js';
import { cadastrarTipo, deletarTipo, listarTipos } from '../repository/tipoVeiculoRepository.js';

import {Router} from 'express';
const server = Router();

server.post('/veiculo', async (req, resp) =>{
    try {
        const inserir = req.body;

        if(!inserir.tipo)
            throw new Error('Tipo inválido.');

        if(!inserir.modelo)
            throw new Error('Modelo inválido.');

        if(!inserir.marca)
            throw new Error('Marca inválida.');

        if(inserir.ano == undefined || isNaN(inserir.ano))
            throw new Error('Ano inválido.');

        const buscarPorPlaca = await buscarPlaca(inserir.placa)
        if(buscarPorPlaca.length > 0)
            throw new Error('Placa já cadastrada.');

        const veiculoInserido = await inserirVeiculo(inserir);
        resp.send(veiculoInserido);

    } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
        
    }
})

server.get('/veiculo', async (req, resp) => {
    try {
        const dados = await listarVeiculo();
        resp.send(dados);

    } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
    }
})

server.post('/tipo/veiculo', async (req, resp) => {
    try {
        const inserir = req.body;

        if(!inserir.tipo)
            throw new Error('Tipo de veículo inválido.');

        const tipoInserirdo = await cadastrarTipo(inserir);
        resp.send(tipoInserirdo);

    } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
    }
})

server.get('/tipo/veiculo', async (req, resp) => {
   try {
        const dados = await listarTipos();
        resp.send(dados);

   } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
   }
})

server.delete('/tipo/veiculo/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const resposta = await deletarTipo(id);

        if(resposta != 1)
            throw new Error('Não foi possível deletar o tipo de veículo.');

        resp.status(201).send();
    } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
    }
})

server.put('/veiculo/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const alteracao = req.body;

        if(!alteracao.tipo)
            throw new Error('Tipo inválido.');

        if(!alteracao.modelo)
            throw new Error('Modelo inválido.');

        if(!alteracao.marca)
            throw new Error('Marca inválida.');

        if(alteracao.ano == undefined || isNaN(alteracao.ano))
            throw new Error('Ano inválido.');

        if(!alteracao.placa)
            throw new Error('Placa inválida.');

        const resposta = await alterarVeiculo(id ,alteracao);

        if(resposta != 1)
            throw new Error('O veículo não pode ser alterado.');

        resp.status(201).send();

    } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
        
    }
})

server.get('/veiculo/buscar', async (req, resp) => {
    try {
        const {modelo, marca, placa} = req.query;
        const dados = await buscarPorNMP(modelo, marca, placa);

        if(dados.length == 0)
            throw new Error('Nenhum veículo encontrado.');

        resp.send(dados);

    } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
    }
})

server.delete('/veiculo/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const resposta = await deletarVeiculo(id);

        if(resposta != 1)
            throw new Error('Não foi possível deletar o veiculo.');

        resp.status(201).send();
        
    } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
    }
})

export default server;
