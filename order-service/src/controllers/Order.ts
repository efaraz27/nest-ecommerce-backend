import Order from "../models/Order";
import { Request, Response } from "express";

export default class OrderController {
  public async createOrder(req: Request, res: Response): Promise<Response> {
    const { user, products, total } = req.body;

    try {
      const order = await Order.create({
        user,
        products,
        total,
      });
      return res.json(order);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  public async getOrderById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const order = await Order.findById(id);
      return res.json(order);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  public async getAllOrdersByUser(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { user } = req.params;
    try {
      const orders = await Order.find({ user });
      return res.json(orders);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  public async deleteOrderById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const order = await Order.findByIdAndDelete(id);
      return res.json(order);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  public async updateOrder(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { user, products, total } = req.body;
    try {
      const order = await Order.findByIdAndUpdate(id, {
        user,
        products,
        total,
      });
      return res.json(order);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
