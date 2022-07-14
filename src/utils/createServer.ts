import express, { NextFunction, Response } from "express";
import dotenv from "dotenv";
import connect from "./connectDatabase";
import { routes } from "./routes";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

export function createServer() {
  app.listen(PORT, () => {
    connect();
    routes(app);
    console.log(`Listening on port ${PORT}`);
  });
}
