const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const { Server } = require("socket.io");
if (process.env.NODE_ENV !== "production") require("dotenv").config();
const bot = require("./DL/bot/bot");
const { loadMainSocket } = require("./DL/sockets/socket");
const router = require("./Routers");

const io = new Server(4001, {
  cors: "*",
});

app.use(express.json());
app.use(require("cors")());
app.use("/api", router);

require("./DL/db")
  .connect()
  .then(
    () => app.listen(PORT, () => console.log(`server is running => ${PORT}`)),
    loadMainSocket(io),
    bot.dealWithMessage()
  )
  .catch((e) => console.log("error", e));

module.exports = { app, io };
