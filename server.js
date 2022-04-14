const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const data = require("./data.json");

// app.use(express.static("."));
app.use(express.static(__dirname + "/"));
app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.listen(app.get("port"), () => {
    console.log("Server started on " + app.get("port"));
});

io.sockets.emit("data", {data: data.data})