import express from 'express';
import handlebars from 'express-handlebars';
import dotenv from 'dotenv';
import { __dirname } from '../utils.js';
import router from '../routes/index.js';
//import { connectionDB } from '../mongo/connection.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from '../passport/jwt.passport.js';
import moment from 'moment';

const conversacion = [];
const usuarios = [];

export const AppInit = (app) => {
    dotenv.config();
    //connectionDB();
    initializePassport();
    passport.initialize();

    app.engine('handlebars', handlebars.engine({
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true
        }
    }));
    app.set('views', __dirname + '/views');
    app.set('view engine','handlebars');

    app.use(cookieParser(process.env.SECRET));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(__dirname + '/public'));
    
    app.use('/', router);
}


export const SocketInit = (socketServer) => {

    socketServer.on('connection', (socket) => {

        socket.on('mensaje',(data) => {
            const fechaHoraFormateada = moment().format('HH:mm DD/MM/YY');
            data.date = fechaHoraFormateada;
            conversacion.push(data);
            socketServer.emit('conversacion', conversacion);
        })
        
        socket.on('nuevoUsuario', (nuevoUsuario) => {
            usuarios.push(nuevoUsuario)
            socketServer.emit('conversacion', conversacion);
        })

        socket.on('desconectarUsuario', (user) => {
            const indiceAEliminar = usuarios.findIndex(usuario => usuario.user === user.user);
            if (indiceAEliminar !== -1) {
                usuarios.splice(indiceAEliminar, 1);
            }
        });
    });
}

