const express = require("express");
const path = require("path");
const http = require("http");
const Filter = require("bad-words");
const app = express();
const socketio = require("socket.io");
const { createMessages } = require("./utils/create-messages");
const { pushUser, removeUser, getUserList } = require("./utils/user");

const publicPathDirectory = path.join(__dirname, "../public");
app.use(express.static(publicPathDirectory));

const server = http.createServer(app);
const io = socketio(server);
// let count = 1;
// const messages = "chao moi nguoi";

io.on("connection", (socket) => {
  socket.on("send room from client to server", ({ username, room }) => {
    socket.join(room);

    socket.emit(
      "send message from server to client",
      createMessages(`Chao mung ${username} den voi Phong: ${room}`)
    );

    socket.broadcast
      .to(room)
      .emit(
        "send message from server to client",
        createMessages(`${username} moi vao phong: ${room}`)
      );

    const newUser = {
      id: socket.id,
      username,
      room,
    };
    pushUser(newUser);
    io.to(room).emit("send message from server to client", getUserList(room));

    socket.on("send message from client to server", (messageText, callback) => {
      const filter = new Filter();
      if (filter.isProfane(messageText)) {
        return callback("messageText khong hop le");
      }
      io.to(room).emit(
        "send message from server to client",
        createMessages(messageText)
      );
      callback();
    });

    socket.on(
      "share location from client to sever",
      ({ latitude, longitude }) => {
        const linklocation = `https://www.google.com/maps?=q${latitude},${longitude}`;
        io.emit(
          "share location from server to client",
          createMessages(linklocation)
        );
      }
    );

    socket.on("disconnect", () => {
      removeUser(socket.id);
      io.to(room).emit("send message from server to client", getUserList(room));
      console.log("client left server");
    });
  });

  // socket.on("send increment client to server", () => {
  //   count++;
  //   socket.emit("send count server to client", count);
  // });

  // socket.emit("send count server to client", count);

  // socket.emit("send message server to client", messages);
});

const port = 4567;

server.listen(port, () => {
  console.log(`app run on http://localhost:${port}`);
});
