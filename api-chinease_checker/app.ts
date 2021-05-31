import express from 'express';
import {PlayerData, Room} from "./interfaces/interfaces";

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

const playersArray: PlayerData[] = [];
const rooms: Room[] = [];

io.on('connection', (socket => {
    console.log(socket.id);
    console.log("Player connected : " + socket.id);
    socket.emit("connectionbro", socket.id);

    socket.on("newPlayer", function(player: PlayerData) {
        let room = rooms.find(room => room.id === player.roomId);
        if (!room) {
            room = {id: player.roomId, players: [], turn: player.color};
            rooms.push(room);
        }
        if (!room.players.find(playerId => playerId === player.id))
            room.players.push(player.id);
        if (!playersArray.find(playerTmp => playerTmp.id === player.id))
            playersArray.push(player);
        console.log('players ', playersArray);
        console.log('rooms ', rooms);
        socket.join(player.roomId);
        socket.emit('getRoom', 'test');
        socket.emit("getPlayersArray", playersArray);
    });

    socket.on("select", function(data) {
        console.log(data);
        io.emit("select", data);
    });

    socket.on("move", function(data) {
        console.log(data);
        io.emit("move", data);
    });

    socket.on('getPlayer', () => {
       const playerObj = playersArray.find(player => player.id === socket.id);
       if (playerObj)
           io.to(playerObj.id).emit('loadPlayer', playerObj);
    });

    socket.on("disconnect", function(data) {
        for (let i = 0; i != playersArray.length; i++) {
            if (playersArray[i].id === socket.id) {
                console.log("bye bye : " + socket.id )
                playersArray.slice(i, 1);
            }
        }
    });
}));

server.listen(3001, () => {
    console.log();
    console.log(`JS FullStack API running on http://localhost:${3001}`);
})
