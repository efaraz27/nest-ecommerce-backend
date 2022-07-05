import express, { Application, Request, Response } from "express";
import { connect } from "mongoose";
import endpointsConfig from "./endpoints.config";
import ProductRouter from "./routes/Product";

const mongoURI: string = endpointsConfig.MongoURI;
try {
  // Connecting to MongoDB
  connect(mongoURI);
} catch (err) {
  // throw error if connection failed
  console.error("Error connecting to MongoDB: ", err);
}
// initialize express
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/products", new ProductRouter().getRouter());

app.listen(5000, () => {
  console.log("Product service listening on port 5000");
});
