import express from "express";
import ProductController from "../controllers/Product";

export default class ProductRouter {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.routes();
  }

  public routes() {
    this.router.get("/", ProductController.getAllProducts);
    this.router.get("/:id", ProductController.getProduct);
    this.router.post("/", ProductController.createProduct);
    this.router.put("/:id", ProductController.updateProduct);
    this.router.delete("/:id", ProductController.deleteProduct);
  }

  public getRouter(): express.Router {
    return this.router;
  }
}
