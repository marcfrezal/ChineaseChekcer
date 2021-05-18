const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());

const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

server.listen(3000, () => {
    console.log();
    console.log(`JS FullStack API running on http://localhost:${3000}`);
})
