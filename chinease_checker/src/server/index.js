const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
 
const playersArray = []

io.on('connection', socket => {
    console.log(socket)
    // console.log("Player connected : " + socket.id);
    // socket.emit("connectionbro", socket.id);

    // socket.on("newPlayer", function(data) {
    //     console.log(playersArray);
    //     playersArray.push(data);
    //     socket.emit("getPlayersArray", playersArray);
    // });
    
    // socket.on("select", function(data) {
    //     io.emit("select", data);
    // });
    
    // socket.on("move", function(data) {
    //     io.emit("move", data);
    // });

    // socket.on("disconnect", function(data) {
    //     console.log("bye bye : " + socket.id )
    
    //     for (let i = 0; i != playersArray.length; i++) {
    //         // console.log(i);
    //         console.log(playersArray[i].id);
    //         // console.log(socket.id);

    //         // if (playersArray[i].id === socket.id) {
    //         //     console.log(playersArray[i].id)

    //         //     // console.log("bye bye : " + socket.id )
    //         //     playersArray.slice(i, 1);
    //         // }
    //     }
    // });
})


http.listen(9090, "127.0.0.1", function() {
  console.log("listening on *:9090");
});
 