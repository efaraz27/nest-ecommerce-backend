import express, { Application, Request, Response } from "express";
import { connect } from "mongoose";
import endpointsConfig from "./endpoints.config";
import amqp from "amqplib/callback_api";
import ProductRouter from "./routes/Product";
import {
  consumeGetAllProducts,
  consumeCreateProduct,
  consumeGetProduct,
} from "./rabbitmq";

// Connecting to RabbitMQ
amqp.connect(endpointsConfig.RabbitMQ, async (err, conn) => {
  if (err) {
    // throw error if connection failed
    console.error("Error connecting to RabbitMQ: ", err);
    return;
  }
  const mongoURI: string = endpointsConfig.MongoURI;
  try {
    // Connecting to MongoDB
    await connect(mongoURI);
  } catch (err) {
    // throw error if connection failed
    console.error("Error connecting to MongoDB: ", err);
    return;
  }
  // Creaing a channel and declaring queues
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

    // Consuming queues
    consumeGetAllProducts(channel);
    consumeGetProduct(channel);
    consumeCreateProduct(channel);


    // initialize express
    const app: Application = express();

    app.get("/", (req: Request, res: Response) => {
      res.send("Hello World!");
    });

    app.use("/products", new ProductRouter().getRouter());

    app.listen(5000, () => {
      console.log("Product service listening on port 5000");
    });
  });
});
