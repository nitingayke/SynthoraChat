import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:9090";

let socket = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      auth: {
        token: localStorage.getItem("token"),
      },
    });
  }
  return socket;
};

export const connectSocket = () => {
  const socket = getSocket();

  socket.auth = {
    token: localStorage.getItem("token"),
  };

  if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket?.connected) {
    socket.disconnect();
  }
};
