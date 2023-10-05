import { alterarCadUsuario, buscarPorNCC, deletarUsuario, inserirUsuario, listarUsuario } from "../repository/usuarioRepository.js";

import { Router } from "express";
const server = Router();

server.post('/usuario', async (req, resp) => {
    try {
        const inserir = req.body;

        if(!inserir.nome)
            throw new Error("Nome é obrigatório.");

        if(!inserir.email)
            throw new Error("E-mail é obrigatório.");

        const buscarCpf = await buscarPorNCC(inserir.cpf)
        if(buscarCpf.length > 0 )
            throw new Error("CPF já cadastrado.");

        const buscarCnh = await buscarPorNCC(inserir.cnh)
        if(buscarCnh.length > 0)
            throw new Error("CNH já cadastrada.");

        if(!inserir.telefone)
            throw new Error("Telefone é obrigatório.");
    
        const usuarioInserido = await inserirUsuario(inserir);
        resp.send(usuarioInserido);
    } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
        
    }
})

server.get('/usuario', async (req, resp) =>{
    try {
        const dados = await listarUsuario();

        if(dados.length == 0)
            throw new Error('Nenhum usuário cadastrado.');

        resp.send(dados);
    } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
        
    }
})

server.get('/usuario/buscar', async (req, resp) => {
    try {
        const nome = req.query.nome;
        const dados = await buscarPorNCC(nome);

        if(dados.length == 0)
            throw new Error('Nenhum usuário com essas informações está cadastrado em nosso site.');

        resp.send(dados);
    } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
    }
})

server.put('/usuario/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const altercao = req.body;

        if(!altercao.nome)
            throw new Error("Nome é obrigatório.");

        if(!altercao.email)
            throw new Error("E-mail é obrigatório.");

        if(!altercao.cpf)
            throw new Error("CPF inválido.");

        if(!altercao.cnh)
            throw new Error("CNH inválida.");

        if(!altercao.telefone)
            throw new Error("Telefone é obrigatório.");

        const resposta = await alterarCadUsuario(id, altercao);
        if(resposta != 1)
            throw new Error('Não foi possível alterar os dados do usuário.');

        resp.status(200).send();
    } catch (err) {
        resp.status(401).send({
            erro: err.message
        })
    }
})

server.delete('/usuario/:id', async (req, resp) => {
    try {
        const {id} = req.params;
        const resposta = await deletarUsuario(id);

        if(resposta != 1)
            throw new Error('Não foi possível deletar o usuário.');

        resp.status(201).send();
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
        
    }
})

export default server;
