import Order from "../models/Order";
import { Request, Response } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;

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
      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }
      const orderDetails = order.toObject();
      for (const product of orderDetails.products) {
        const productId = product.product;
        try {
          const res = await axios.get(
            `${PRODUCT_SERVICE_URL}/products/${productId}`
          );
          product.product = res.data;
        } catch (error) {
          console.log(error);
        }
        // const res = await fetch(`${PRODUCT_SERVICE_URL}/${productId}`);
        // product.product = res.json();
        // console.log(res.json());
      }
      return res.json(orderDetails);
    } catch (error) {
      console.log(error);
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
