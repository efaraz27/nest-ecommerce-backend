import { Schema, model } from "mongoose";

interface IOrder {
  user: string;
  products: Array<{
    product: string;
    quantity: number;
  }>;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: String,
      required: true,
    },
    products: [
      {
        product: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Order = model<IOrder>("Order", orderSchema);

export default Order;
