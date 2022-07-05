import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to order service");
});

app.listen(port, () => {
  console.log(`⚡️[Order Service]: Order Service is listening on port ${port}`);
});
