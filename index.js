const express = require("express");
const { Socket } = require("socket.io");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static(__dirname + "/public"));

const PORT = process.env.PORT || 4011;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

http.listen(PORT, () => {
  console.log(`working on http://localhost:${PORT}`);
});

//
io.on("connection", (socket) => {
  console.log("socket");
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
