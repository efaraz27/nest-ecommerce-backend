import Product from "../models/Product";
import {Request, Response} from "express";

export default class ProductController {
  public static async getAllProducts(req: Request, res: Response) {
    const products: JSON[] = await Product.find({});
    res.json(products);
  }

  public static async getProduct(req: Request, res: Response) {
    const product = await Product.findById(req.params.id);
    res.json(product);
  }

  public static async createProduct(req: Request, res: Response) {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  }

  public static async updateProduct(req: Request, res: Response) {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(product);
  }

  public static async deleteProduct(req: Request, res: Response) {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  }
}
