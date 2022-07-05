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
const Product_1 = __importDefault(require("../models/Product"));
class ProductController {
    static getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield Product_1.default.find({});
            res.json(products);
        });
    }
    static getProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield Product_1.default.findById(req.params.id);
            res.json(product);
        });
    }
    static createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = new Product_1.default(req.body);
            yield product.save();
            res.json(product);
        });
    }
    static updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield Product_1.default.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });
            res.json(product);
        });
    }
    static deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Product_1.default.findByIdAndDelete(req.params.id);
            res.json({ message: "Product deleted" });
        });
    }
}
exports.default = ProductController;
