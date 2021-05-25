import express from 'express';

const app = express();
import http from 'http';
import cors from 'cors';
import bodyParser from "body-parser";

app.use(bodyParser.json());
app.use(cors());

import { Server, Socket } from "socket.io";
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

import {database} from './firebase-config.js'

app.get('/', (req, res) => {
    res.send('Hello World!');
    // database.collection()
})

server.listen(3000, () => {
    console.log();
    console.log(`JS FullStack API running on http://localhost:${3000}`);
})
