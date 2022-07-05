import Product from "../models/Product";
import { Request, Response } from "express";

export default class ProductController {
  public async getAllProducts(req: Request, res: Response) {
    const products: JSON[] = await Product.find({});
    res.json(products);
  }

  public async getProduct(req: Request, res: Response) {
    try {
      const product = await Product.findById(req.params.id);
      return res.json(product);
    } catch (err) {
      return res.json({ message: err });
    }
  }

  public async createProduct(req: Request, res: Response) {
    try {
      const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description,
        category: req.body.category,
      });
      await product.save();
      return res.json(product);
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  }

  public async updateProduct(req: Request, res: Response) {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(product);
  }

  public async deleteProduct(req: Request, res: Response) {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  }
}
