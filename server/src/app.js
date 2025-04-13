import { createServer } from "node:http";
import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import { Server } from "socket.io";
import cors from "cors";
import userRouter from "./modules/user/user.router.js";
import userService from "./modules/user/user.service.js";

const app = express();
const server = createServer(app);
export const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*"
  })
);

if (process.env.NODE_ENV.trim() === "development") {
  app.use(morgan("tiny"));
}

app.use("/api", userRouter)

// io.on("connection", (socket) => {
//   socket.on("message", (msg) => {
//     console.log(msg);

//     socket.emit("message", `Yangi xabar: ${msg}`);
//   });
// });

io.on("connection", (socket) => {
    console.log("connected")
    socket.on("login", async (data) => {
        console.log("loginnnnnnnn")
        const user = await userService.createUser(data)
        socket.emit("login", user)
    })
})

export default server;
