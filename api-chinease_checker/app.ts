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

import {database} from './firebase-config'

app.get('/', (req, res) => {
    res.send('Hello World!');
    // database.collection()
})

const playersArray: PlayerData[] = [];
const rooms: Room[] = [];

function getNextPlayerToplay (selectedCell) {
    switch (selectedCell.color) {
        case "red":
            return ("brown");
        case "brown":
            return ("green");
        case "green":
            return ("pink");
        case "pink":
            return ("yellow");
        case "yellow":
            return ("blue");
        case "blue":
            return ("red");
        default:
            return ("error");
    }
}

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
        socket.join(player.roomId);
        socket.emit('getRoom', room.id);
        socket.emit("getPlayersArray", playersArray);
    });

    socket.on("select", function(data) {
        io.emit("select", data);
    });

    socket.on("move", function(data) {
        io.emit("move", data);
    });

    socket.on('nextPlayer', ({roomId, nextPlayer}) => {
        const room = rooms.find(room => room.id === roomId);
        room.turn = nextPlayer;
    });

    socket.on('getPlayer', () => {
        console.log(socket.id);
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

    socket.on('saveMap', ({hexaMap, roomId}) => {
        database.collection('maps').doc(roomId).set({roomId: roomId, map: JSON.stringify(hexaMap)})
    })

    socket.on('loadMap', async (roomId) => {
        database.collection('maps').doc(roomId).get().then(data => {
            const roomData = data.data();
            if (roomData) {
                const hexaMap = roomData.map;
                const room = rooms.find(room => room.id === roomId);
                io.to(socket.id).emit('map', {map: JSON.parse(hexaMap), roomTurn: room.turn});
            }
        });

    })
}));

server.listen(3001, () => {
    console.log();
    console.log(`JS FullStack API running on http://localhost:${3001}`);
})
