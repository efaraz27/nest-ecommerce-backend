import express from "express";
import OrderController from "../controllers/Order";

export default class OrderRouter {
  public orderController: OrderController;
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.orderController = new OrderController();
  }

  public routes(): express.Router {
    this.router.post("/", this.orderController.createOrder);
    this.router.get("/:id", this.orderController.getOrderById);
    this.router.delete("/:id", this.orderController.deleteOrderById);
    return this.router;
  }
}
