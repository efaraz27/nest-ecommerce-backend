import { Channel } from "amqplib/callback_api";
import Product from "../models/Product";

export const consumeGetAllProducts = async (channel: Channel) => {
  channel.consume("get_all_products", (msg) => {
    if (msg) {
      Product.find({}, (err: JSON, products: JSON) => {
        if (err) {
          console.error("Error getting products: ", err);
          return;
        }
        channel.sendToQueue(
          msg.properties.replyTo,
          Buffer.from(JSON.stringify(products)),
          {
            correlationId: msg.properties.correlationId,
          }
        );
        channel.ack(msg);
      });
    }
  });
};

export const consumeGetProduct = async (channel: Channel) => {
  channel.consume("get_product", (msg) => {
    // msg.content === Buffer(productId)
    if (msg) {
      Product.findById(msg.content.toString(), (err: JSON, product: JSON) => {
        if (err) {
          console.error("Error getting product: ", err);
          return;
        }
        channel.sendToQueue(
          msg.properties.replyTo,
          Buffer.from(JSON.stringify(product)),
          {
            correlationId: msg.properties.correlationId,
          }
        );
        channel.ack(msg);
      });
    }
  });
};

export const consumeCreateProduct = async (channel: Channel) => {
  channel.consume("create_product", async (msg) => {
    if (msg) {
      const product = JSON.parse(msg.content.toString());
      const newProduct = new Product(product);
      try {
        await newProduct.save();
        channel.sendToQueue(
          msg.properties.replyTo,
          Buffer.from(JSON.stringify(newProduct)),
          {
            correlationId: msg.properties.correlationId,
          }
        );
        channel.ack(msg);
      } catch (err) {
        console.error("Error creating product: ", err);
        return;
      }
    }
  });
};

export const consumeUpdateProduct = async (channel: Channel) => {
  channel.consume("update_product", (msg) => {
    if (msg) {
      const product = JSON.parse(msg.content.toString());
      Product.findByIdAndUpdate(
        product._id,
        product,
        (err: JSON, product: JSON) => {
          if (err) {
            console.error("Error updating product: ", err);
            return;
          }
          channel.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(JSON.stringify(product)),
            {
              correlationId: msg.properties.correlationId,
            }
          );
          channel.ack(msg);
        }
      );
    }
  });
};

export const consumeDeleteProduct = async (channel: Channel) => {
  channel.consume("delete_product", (msg) => {
    if (msg) {
      Product.findByIdAndDelete(
        msg.content.toString(),
        (err: JSON, product: JSON) => {
          if (err) {
            console.error("Error deleting product: ", err);
            return;
          }
          channel.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(JSON.stringify(product)),
            {
              correlationId: msg.properties.correlationId,
            }
          );
          channel.ack(msg);
        }
      );
    }
  });
};

export const consumeGetProductByCategory = async (channel: Channel) => {
  channel.consume("get_product_by_category", (msg) => {
    if (msg) {
      Product.find(
        { category: msg.content.toString() },
        (err: JSON, products: JSON) => {
          if (err) {
            console.error("Error getting products: ", err);
            return;
          }
          channel.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(JSON.stringify(products)),
            {
              correlationId: msg.properties.correlationId,
            }
          );
          channel.ack(msg);
        }
      );
    }
  });
};

export const consumeGetProductByName = async (channel: Channel) => {
  channel.consume("get_product_by_name", (msg) => {
    if (msg) {
      Product.find(
        { name: msg.content.toString() },
        (err: JSON, products: JSON) => {
          if (err) {
            console.error("Error getting products: ", err);
            return;
          }
          channel.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(JSON.stringify(products)),
            {
              correlationId: msg.properties.correlationId,
            }
          );
          channel.ack(msg);
        }
      );
    }
  });
};

export const consumeGetProductByPrice = async (channel: Channel) => {
  channel.consume("get_product_by_price", (msg) => {
    if (msg) {
      Product.find(
        { price: msg.content.toString() },
        (err: JSON, products: JSON) => {
          if (err) {
            console.error("Error getting products: ", err);
            return;
          }
          channel.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(JSON.stringify(products)),
            {
              correlationId: msg.properties.correlationId,
            }
          );
          channel.ack(msg);
        }
      );
    }
  });
};

export const consumeGetProductByPriceRange = async (channel: Channel) => {
  channel.consume("get_product_by_price_range", (msg) => {
    if (msg) {
      const priceRange = JSON.parse(msg.content.toString());
      Product.find(
        { price: { $gte: priceRange.min, $lte: priceRange.max } },
        (err: JSON, products: JSON) => {
          if (err) {
            console.error("Error getting products: ", err);
            return;
          }
          channel.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(JSON.stringify(products)),
            {
              correlationId: msg.properties.correlationId,
            }
          );
          channel.ack(msg);
        }
      );
    }
  });
};

export const consumeGetProductByPriceRangeAndCategory = async (
  channel: Channel
) => {
  channel.consume("get_product_by_price_range_and_category", (msg) => {
    if (msg) {
      const priceRange = JSON.parse(msg.content.toString());
      Product.find(
        {
          price: { $gte: priceRange.min, $lte: priceRange.max },
          category: priceRange.category,
        },
        (err: JSON, products: JSON) => {
          if (err) {
            console.error("Error getting products: ", err);
            return;
          }
          channel.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(JSON.stringify(products)),
            {
              correlationId: msg.properties.correlationId,
            }
          );
          channel.ack(msg);
        }
      );
    }
  });
};

export const consumeGetProductByPriceRangeAndName = async (
  channel: Channel
) => {
  channel.consume("get_product_by_price_range_and_name", (msg) => {
    if (msg) {
      const priceRange = JSON.parse(msg.content.toString());
      Product.find(
        {
          price: { $gte: priceRange.min, $lte: priceRange.max },
          name: priceRange.name,
        },
        (err: JSON, products: JSON) => {
          if (err) {
            console.error("Error getting products: ", err);
            return;
          }
          channel.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(JSON.stringify(products)),
            {
              correlationId: msg.properties.correlationId,
            }
          );
          channel.ack(msg);
        }
      );
    }
  });
};

export const consumeGetProductByPriceRangeAndNameAndCategory = async (
  channel: Channel
) => {
  channel.consume("get_product_by_price_range_and_name_and_category", (msg) => {
    if (msg) {
      const priceRange = JSON.parse(msg.content.toString());
      Product.find(
        {
          price: { $gte: priceRange.min, $lte: priceRange.max },
          name: priceRange.name,
          category: priceRange.category,
        },
        (err: JSON, products: JSON) => {
          if (err) {
            console.error("Error getting products: ", err);
            return;
          }
          channel.sendToQueue(
            msg.properties.replyTo,
            Buffer.from(JSON.stringify(products)),
            {
              correlationId: msg.properties.correlationId,
            }
          );
          channel.ack(msg);
        }
      );
    }
  });
};
