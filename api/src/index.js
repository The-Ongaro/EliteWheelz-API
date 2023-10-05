import 'dotenv/config'

import express from 'express';
import cors from 'cors';

import usuarioController from './controller/usuarioController.js';
import locacaoController from './controller/locacaoController.js';

const server = express();
server.use(cors());
server.use(express.json());

server.use(usuarioController);
server.use(locacaoController);

server.listen(process.env.PORT, () => console.log(`API online na porta ${process.env.PORT}`));