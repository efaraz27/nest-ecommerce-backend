"use strict";
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    MongoURI: (_a = process.env.MONGODB_URI) !== null && _a !== void 0 ? _a : "mongodb://root:root@localhost:27017/",
    Port: (_b = process.env.PORT) !== null && _b !== void 0 ? _b : 5000,
    Secret: (_c = process.env.SECRET) !== null && _c !== void 0 ? _c : "secret",
    TokenExpiration: (_d = process.env.TOKEN_EXPIRATION) !== null && _d !== void 0 ? _d : "1h",
    RabbitMQ: (_e = process.env.RABBITMQ_URI) !== null && _e !== void 0 ? _e : "amqp://localhost:5672",
};
