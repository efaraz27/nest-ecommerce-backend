import express from "express";
import ProductController from "../controllers/Product";

export default class ProductRouter {
  public router: express.Router;
  public productController: ProductController;

  constructor() {
    this.router = express.Router();
    this.productController = new ProductController();
    this.routes();
  }

  public routes() {
    this.router.get("/", this.productController.getAllProducts);
    this.router.get("/:id", this.productController.getProduct);
    this.router.post("/", this.productController.createProduct);
    this.router.put("/:id", this.productController.updateProduct);
    this.router.delete("/:id", this.productController.deleteProduct);
  }

  public getRouter(): express.Router {
    return this.router;
  }
}
