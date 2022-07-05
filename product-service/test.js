var amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost:5672", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function (error1, channel) {
    if (error1) {
      throw error1;
    }
    const newProduct = {
      name: "Product 1",
      price: 100,
      description: "This is a product",
      image: "https://picsum.photos/200/300",
      category: "Electronics",
    };
    var correlationId = generateUuid();

    console.log("created product with correlationId: " + correlationId);

    channel.consume(
      "create_product",
      function (msg) {
        if (msg.properties.correlationId == correlationId) {
          console.log(" [.] Got %s", msg.content.toString());
          setTimeout(function () {
            connection.close();
            process.exit(0);
          }, 500);
        }
      },
      {
        noAck: true,
      }
    );
    channel.sendToQueue(
      "create_product",
      Buffer.from(JSON.stringify(newProduct)),
      {
        correlationId: correlationId,
        replyTo: "create_product",
      }
    );
  });
});

function generateUuid() {
  return (
    Math.random().toString() +
    Math.random().toString() +
    Math.random().toString()
  );
}
