export const socketAuth = (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Unauthorized socket"));
    }

    // TODO: verify JWT token
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // socket.user = decoded;

    next();
  } catch {
    next(new Error("Socket authentication failed"));
  }
};
