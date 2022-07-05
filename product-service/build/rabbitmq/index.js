"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumeGetProductByPriceRangeAndNameAndCategory = exports.consumeGetProductByPriceRangeAndName = exports.consumeGetProductByPriceRangeAndCategory = exports.consumeGetProductByPriceRange = exports.consumeGetProductByPrice = exports.consumeGetProductByName = exports.consumeGetProductByCategory = exports.consumeDeleteProduct = exports.consumeUpdateProduct = exports.consumeCreateProduct = exports.consumeGetProduct = exports.consumeGetAllProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const consumeGetAllProducts = (channel) => __awaiter(void 0, void 0, void 0, function* () {
    channel.consume("get_all_products", (msg) => {
        if (msg) {
            Product_1.default.find({}, (err, products) => {
                if (err) {
                    console.error("Error getting products: ", err);
                    return;
                }
                channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(products)), {
                    correlationId: msg.properties.correlationId,
                });
                channel.ack(msg);
            });
        }
    });
});
exports.consumeGetAllProducts = consumeGetAllProducts;
const consumeGetProduct = (channel) => __awaiter(void 0, void 0, void 0, function* () {
    channel.consume("get_product", (msg) => {
        // msg.content === Buffer(productId)
        if (msg) {
            Product_1.default.findById(msg.content.toString(), (err, product) => {
                if (err) {
                    console.error("Error getting product: ", err);
                    return;
                }
                channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(product)), {
                    correlationId: msg.properties.correlationId,
                });
                channel.ack(msg);
            });
        }
    });
});
exports.consumeGetProduct = consumeGetProduct;
const consumeCreateProduct = (channel) => __awaiter(void 0, void 0, void 0, function* () {
    channel.consume("create_product", (msg) => {
        if (msg) {
            const product = JSON.parse(msg.content.toString());
            const newProduct = new Product_1.default(product);
            newProduct.save().then(() => {
                channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(newProduct)), {
                    correlationId: msg.properties.correlationId,
                });
                channel.ack(msg);
            });
        }
    });
});
exports.consumeCreateProduct = consumeCreateProduct;
const consumeUpdateProduct = (channel) => __awaiter(void 0, void 0, void 0, function* () {
    channel.consume("update_product", (msg) => {
        if (msg) {
            const product = JSON.parse(msg.content.toString());
            Product_1.default.findByIdAndUpdate(product._id, product, (err, product) => {
                if (err) {
                    console.error("Error updating product: ", err);
                    return;
                }
                channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(product)), {
                    correlationId: msg.properties.correlationId,
                });
                channel.ack(msg);
            });
        }
    });
});
exports.consumeUpdateProduct = consumeUpdateProduct;
const consumeDeleteProduct = (channel) => __awaiter(void 0, void 0, void 0, function* () {
    channel.consume("delete_product", (msg) => {
        if (msg) {
            Product_1.default.findByIdAndDelete(msg.content.toString(), (err, product) => {
                if (err) {
                    console.error("Error deleting product: ", err);
                    return;
                }
                channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(product)), {
                    correlationId: msg.properties.correlationId,
                });
                channel.ack(msg);
            });
        }
    });
});
exports.consumeDeleteProduct = consumeDeleteProduct;
const consumeGetProductByCategory = (channel) => __awaiter(void 0, void 0, void 0, function* () {
    channel.consume("get_product_by_category", (msg) => {
        if (msg) {
            Product_1.default.find({ category: msg.content.toString() }, (err, products) => {
                if (err) {
                    console.error("Error getting products: ", err);
                    return;
                }
                channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(products)), {
                    correlationId: msg.properties.correlationId,
                });
                channel.ack(msg);
            });
        }
    });
});
exports.consumeGetProductByCategory = consumeGetProductByCategory;
const consumeGetProductByName = (channel) => __awaiter(void 0, void 0, void 0, function* () {
    channel.consume("get_product_by_name", (msg) => {
        if (msg) {
            Product_1.default.find({ name: msg.content.toString() }, (err, products) => {
                if (err) {
                    console.error("Error getting products: ", err);
                    return;
                }
                channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(products)), {
                    correlationId: msg.properties.correlationId,
                });
                channel.ack(msg);
            });
        }
    });
});
exports.consumeGetProductByName = consumeGetProductByName;
const consumeGetProductByPrice = (channel) => __awaiter(void 0, void 0, void 0, function* () {
    channel.consume("get_product_by_price", (msg) => {
        if (msg) {
            Product_1.default.find({ price: msg.content.toString() }, (err, products) => {
                if (err) {
                    console.error("Error getting products: ", err);
                    return;
                }
                channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(products)), {
                    correlationId: msg.properties.correlationId,
                });
                channel.ack(msg);
            });
        }
    });
});
exports.consumeGetProductByPrice = consumeGetProductByPrice;
const consumeGetProductByPriceRange = (channel) => __awaiter(void 0, void 0, void 0, function* () {
    channel.consume("get_product_by_price_range", (msg) => {
        if (msg) {
            const priceRange = JSON.parse(msg.content.toString());
            Product_1.default.find({ price: { $gte: priceRange.min, $lte: priceRange.max } }, (err, products) => {
                if (err) {
                    console.error("Error getting products: ", err);
                    return;
                }
                channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(products)), {
                    correlationId: msg.properties.correlationId,
                });
                channel.ack(msg);
            });
        }
    });
});
exports.consumeGetProductByPriceRange = consumeGetProductByPriceRange;
const consumeGetProductByPriceRangeAndCategory = (channel) => __awaiter(void 0, void 0, void 0, function* () {
    channel.consume("get_product_by_price_range_and_category", (msg) => {
        if (msg) {
            const priceRange = JSON.parse(msg.content.toString());
            Product_1.default.find({
                price: { $gte: priceRange.min, $lte: priceRange.max },
                category: priceRange.category,
            }, (err, products) => {
                if (err) {
                    console.error("Error getting products: ", err);
                    return;
                }
                channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(products)), {
                    correlationId: msg.properties.correlationId,
                });
                channel.ack(msg);
            });
        }
    });
});
exports.consumeGetProductByPriceRangeAndCategory = consumeGetProductByPriceRangeAndCategory;
const consumeGetProductByPriceRangeAndName = (channel) => __awaiter(void 0, void 0, void 0, function* () {
    channel.consume("get_product_by_price_range_and_name", (msg) => {
        if (msg) {
            const priceRange = JSON.parse(msg.content.toString());
            Product_1.default.find({
                price: { $gte: priceRange.min, $lte: priceRange.max },
                name: priceRange.name,
            }, (err, products) => {
                if (err) {
                    console.error("Error getting products: ", err);
                    return;
                }
                channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(products)), {
                    correlationId: msg.properties.correlationId,
                });
                channel.ack(msg);
            });
        }
    });
});
exports.consumeGetProductByPriceRangeAndName = consumeGetProductByPriceRangeAndName;
const consumeGetProductByPriceRangeAndNameAndCategory = (channel) => __awaiter(void 0, void 0, void 0, function* () {
    channel.consume("get_product_by_price_range_and_name_and_category", (msg) => {
        if (msg) {
            const priceRange = JSON.parse(msg.content.toString());
            Product_1.default.find({
                price: { $gte: priceRange.min, $lte: priceRange.max },
                name: priceRange.name,
                category: priceRange.category,
            }, (err, products) => {
                if (err) {
                    console.error("Error getting products: ", err);
                    return;
                }
                channel.sendToQueue(msg.properties.replyTo, Buffer.from(JSON.stringify(products)), {
                    correlationId: msg.properties.correlationId,
                });
                channel.ack(msg);
            });
        }
    });
});
exports.consumeGetProductByPriceRangeAndNameAndCategory = consumeGetProductByPriceRangeAndNameAndCategory;
