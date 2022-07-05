import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import OrderRouter from "./routes/Order";
import { connect } from "mongoose";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
try {
  // Connecting to MongoDB
  connect(MONGODB_URI ? MONGODB_URI : "");
} catch (err) {
  // throw error if connection failed
  console.error("Error connecting to MongoDB: ", err);
}

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

const orderRouter = new OrderRouter();
app.use("/order", orderRouter.routes());

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
