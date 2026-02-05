import { Server } from "socket.io";

export const ACTIVE_USERS = new Map();

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

    socket.on("user:online", ({ userId }) => {
      if (!userId) return;

      const prevUserId = socket.data.userId;

      if (prevUserId && prevUserId !== userId) {
        const prevEntry = ACTIVE_USERS.get(prevUserId);

        if (prevEntry) {
          prevEntry.sockets.delete(socket.id);

          if (prevEntry.sockets.size === 0) {
            prevEntry.lastSeen = Date.now();
            io.emit("user:presence", {
              userId: prevUserId,
              online: false,
              lastSeen: prevEntry.lastSeen,
            });
          }
        }
      }

      let entry = ACTIVE_USERS.get(userId) || {
        sockets: new Set(),
        lastSeen: Date.now(),
      };

      const wasOffline = entry.sockets.size === 0;
      entry.sockets.add(socket.id);
      ACTIVE_USERS.set(userId, entry);

      socket.data.userId = userId;

      if (wasOffline) {
        io.emit("user:presence", {
          userId,
          online: true,
          lastSeen: entry.lastSeen,
        });
      }
    });

    socket.on("user:offline", () => {
      const userId = socket.data.userId;
      if (!userId) return;

      const entry = ACTIVE_USERS.get(userId);
      if (!entry) return;

      entry.sockets.delete(socket.id);

      if (entry.sockets.size === 0) {
        entry.lastSeen = Date.now();

        io.emit("user:presence", {
          userId,
          online: false,
          lastSeen: entry.lastSeen,
        });
      }

      socket.data.userId = null;
    });

    socket.on("question:join", ({ questionId }) => {
      socket.join(`question:${questionId}`);
      console.log(`joined question:${questionId}`);
    });

    socket.on("question:leave", ({ questionId }) => {
      socket.leave(`question:${questionId}`);
      console.log(`left question:${questionId}`);
    });

    socket.on("disconnect", () => {
      const userId = socket.data.userId;
      if (!userId) return;

      const entry = ACTIVE_USERS.get(userId);
      if (!entry) return;

      entry.sockets.delete(socket.id);
      if (entry.sockets.size === 0) {
        entry.lastSeen = Date.now();
        io.emit("user:presence", {
          userId,
          online: false,
          lastSeen: entry.lastSeen,
        });
      }

      ACTIVE_USERS.set(userId, entry);

      console.log(
        `User ${userId} disconnected. Remaining devices: ${entry.sockets.size}`,
      );
    });
  });

  return io;
};
