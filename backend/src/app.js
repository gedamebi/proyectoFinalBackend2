import express from 'express';
import { Server } from 'socket.io';
import { AppInit, SocketInit } from './init/initialConfig.js'

const app = express()

AppInit(app);

const httpServer = app.listen(process.env.PORT, () => {
  console.log('Servidor escuchando en puerto ' + process.env.PORT)
});

const socketServer = new Server(httpServer);
SocketInit(socketServer);
