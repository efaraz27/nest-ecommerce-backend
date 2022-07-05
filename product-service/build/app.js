"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = require("mongoose");
const endpoints_config_1 = __importDefault(require("./endpoints.config"));
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
const Product_1 = __importDefault(require("./routes/Product"));
const rabbitmq_1 = require("./rabbitmq");
callback_api_1.default.connect(endpoints_config_1.default.RabbitMQ, (err, conn) => {
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
        (0, rabbitmq_1.consumeGetAllProducts)(channel);
        (0, rabbitmq_1.consumeGetProduct)(channel);
        (0, rabbitmq_1.consumeCreateProduct)(channel);
        const app = (0, express_1.default)();
        dotenv_1.default.config();
        const mongoURI = endpoints_config_1.default.MongoURI;
        (0, mongoose_1.connect)(mongoURI)
            .then(() => {
            console.log("Connected to MongoDB");
        })
            .catch((err) => {
            console.log("Error connecting to MongoDB: ", err);
        });
        app.get("/", (req, res) => {
            res.send("Hello World!");
        });
        app.use("/products", new Product_1.default().getRouter());
        app.listen(5000, () => {
            console.log("Product service listening on port 5000");
        });
    });
});
