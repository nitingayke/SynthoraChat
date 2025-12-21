import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "node:http";

import { connectDatabase } from "./config/database.js";

import authRoute from "./routes/authRoute.js";
import questionRoute from "./routes/questionRoute.js"
import userRoute from "./routes/userRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 9090;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: "*",
        credentials: true
    })
);

connectDatabase(MONGODB_URL);

const server = http.createServer(app);

app.use("/auth", authRoute);

app.use("/u", userRoute);

app.use("/q", questionRoute);


app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});


const startServer = async () => {
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

startServer();

