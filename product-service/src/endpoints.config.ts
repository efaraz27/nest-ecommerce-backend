export default {
  MongoURI: process.env.MONGODB_URI ?? "mongodb://root:root@mongodb:27017/",
  Port: process.env.PORT ?? 5000,
  Secret: process.env.SECRET ?? "secret",
  TokenExpiration: process.env.TOKEN_EXPIRATION ?? "1h",
  RabbitMQ: process.env.RABBITMQ_URI ?? "amqp://localhost:5672",
};
