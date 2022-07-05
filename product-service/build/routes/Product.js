"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Product_1 = __importDefault(require("../controllers/Product"));
class ProductRouter {
    constructor() {
        this.router = express_1.default.Router();
        this.routes();
    }
    routes() {
        this.router.get("/", Product_1.default.getAllProducts);
        this.router.get("/:id", Product_1.default.getProduct);
        this.router.post("/", Product_1.default.createProduct);
        this.router.put("/:id", Product_1.default.updateProduct);
        this.router.delete("/:id", Product_1.default.deleteProduct);
    }
    getRouter() {
        return this.router;
    }
}
exports.default = ProductRouter;
