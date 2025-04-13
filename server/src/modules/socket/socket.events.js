import userService from "../user/user.service.js";

export const initializeSocketEvents = (io) => {
  io.on("connection", (socket) => {
    socket.on("login", async (name) => {
      const user = await userService.createUser(name);
      socket.broadcast.emit("userJoined", name);
      socket.emit("login", user);
    });

    socket.on("typing", (name) => {
      socket.broadcast.emit("typing", name);
    });

    socket.on("message", ({ userName, message }) => {
      io.emit("message", { userName, message });
    });
  });
};
