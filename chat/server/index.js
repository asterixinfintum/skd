if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}

import "regenerator-runtime/runtime.js";
import express from "express";
import http from "http";
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import socket from 'socket.io';
import mongoose from 'mongoose';

const app = express();
const server = http.createServer(app);

import chatmsgroute from './routes/chatmsg';

import { createMsg, setUserState, setUserStateOffline, setMsgAsSeen } from './utils';

const allowedOrigins = [`${process.env.baseurl}`, `${process.env.wwwbaseurl}`];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
    optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));
app.use(express.urlencoded({
    extended: false
}));

const io = socket(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
        allowedHeaders: ["Authorization"],
        credentials: true
    }
});

async function initSocketIO() {
    io.on('connection', async (socket) => {
        const userid = socket.handshake.query.userid;
        const user = await setUserState(userid);

        if (user) {
            socket.user = user;
            //io.emit('useronline', user)
        }

        socket.on('sendMessage', async (data) => {
            try {
                const savedChatMessage = await createMsg(data, socket.user._id);

                if (savedChatMessage) {
                    io.emit('newMessage', {
                        message: savedChatMessage.message,
                        time: savedChatMessage.time,
                        user: savedChatMessage.user,
                        _id: savedChatMessage._id,
                        from: savedChatMessage.from,
                        seen: savedChatMessage.seen,
                    });
                }
            } catch (error) {
                console.error('Error saving message:', error);
            }
        });

        socket.on('setMsgAsSeen', async (data) => {
            try {
                await setMsgAsSeen(data);

                io.emit('msgsSetAsSeen')
            } catch (error) {
                console.error('Error saving message:', error);
            }
        })

        socket.on('disconnect', async () => {
            //setUserStateOffline(socket.user);
        })
    });
}

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8082;

app.use(chatmsgroute);

mongoose.connect(`${process.env.DB}`, {
    //mongodb://db:27017/traderapiv2 =====> production
    //mongodb://127.0.0.1:27017/traderapiv2 ===> development

    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    console.log('connected to database');

    server.listen(PORT, async (error) => {
        if (error) {
            return error;
        }

        initSocketIO();

        return console.log(`server started on port here now ${PORT}`);
    });
});