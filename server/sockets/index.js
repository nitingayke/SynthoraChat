import { Server } from "socket.io";

export const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`A user connected: ${socket.id}`);

    socket.on("question:join", ({ questionId }) => {
      socket.join(`question:${questionId}`);
      console.log(`joined question:${questionId}`);
    });

    socket.on("question:leave", ({ questionId }) => {
      socket.leave(`question:${questionId}`);
      console.log(`left question:${questionId}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};
