import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import endpointsConfig from "./endpoints.config";
import amqp, { Message } from "amqplib/callback_api";
import Product from "./models/Product";
import ProductRouter from "./routes/Product";
import {
  consumeGetAllProducts,
  consumeCreateProduct,
  consumeGetProduct,
} from "./rabbitmq";

amqp.connect(endpointsConfig.RabbitMQ, (err, conn) => {
  if (err) {
    console.error("Error connecting to RabbitMQ: ", err);
    return;
  }
  conn.createChannel((err, channel) => {
    if (err) {
      console.error("Error creating RabbitMQ channel: ", err);
      return;
    }
    channel.assertQueue("get_all_products", { durable: false });
    channel.assertQueue("get_product", { durable: false });
    channel.assertQueue("create_product", { durable: false });

    // channel.assertQueue("update_product", { durable: false });
    // channel.assertQueue("delete_product", { durable: false });

    consumeGetAllProducts(channel);
    consumeGetProduct(channel);
    consumeCreateProduct(channel);

    const app: Application = express();
    dotenv.config();

    const mongoURI: string = endpointsConfig.MongoURI;

    connect(mongoURI)
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        console.log("Error connecting to MongoDB: ", err);
      });

    app.get("/", (req: Request, res: Response) => {
      res.send("Hello World!");
    });

    app.use("/products", new ProductRouter().getRouter());

    app.listen(5000, () => {
      console.log("Product service listening on port 5000!");
    });
  });
});
