import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import { connect } from "mongoose";
import endpointsConfig from "./endpoints.config";
import amqp, { Message } from "amqplib/callback_api";
import Product from "./models/Product";
import ProductRouter from "./routes/Product";

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
    channel.assertQueue("update_product", { durable: false });
    channel.assertQueue("delete_product", { durable: false });

    channel.consume("get_all_products", (msg) => {
      if (msg) {
        Product.find({}, (err: JSON, products: JSON[]) => {
          if (err) {
            console.error("Error getting all products: ", err);
            return;
          }
          channel.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(JSON.stringify(products)),
            {
              correlationId: msg.properties.correlationId,
            }
          );
          channel.ack(msg);
        });
      }
    });
    channel.consume("get_product", (msg) => {
      // msg.content === Buffer(productId)
      if (msg) {
        Product.findById(msg.content.toString(), (err: JSON, product: JSON) => {
          if (err) {
            console.error("Error getting product: ", err);
            return;
          }
          channel.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(JSON.stringify(product)),
            {
              correlationId: msg.properties.correlationId,
            }
          );
          channel.ack(msg);
        });
      }
    });
    channel.consume("create_product", (msg) => {
      if (msg) {
        const product = JSON.parse(msg.content.toString());
        const newProduct = new Product(product);
        newProduct.save().then(() => {
          channel.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(JSON.stringify(newProduct)),
            {
              correlationId: msg.properties.correlationId,
            }
          );
          channel.ack(msg);
        });
      }
    });
    channel.consume("update_product", (msg) => {
      if (msg) {
        const product = JSON.parse(msg.content.toString());
        Product.findByIdAndUpdate(
          product._id,
          product,
          (err: JSON, product: JSON) => {
            if (err) {
              console.error("Error updating product: ", err);
              return;
            }
            channel.sendToQueue(
              msg.properties.replyTo,
              Buffer.from(JSON.stringify(product)),
              {
                correlationId: msg.properties.correlationId,
              }
            );
            channel.ack(msg);
          }
        );
      }
    });
    channel.consume("delete_product", (msg) => {
      if (msg) {
        Product.findByIdAndDelete(
          msg.content.toString(),
          (err: JSON, product: JSON) => {
            if (err) {
              console.error("Error deleting product: ", err);
              return;
            }
            channel.sendToQueue(
              msg.properties.replyTo,
              Buffer.from(JSON.stringify(product)),
              {
                correlationId: msg.properties.correlationId,
              }
            );
            channel.ack(msg);
          }
        );
      }
    });

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
