const { Order, OrderItem } = require("../model");
const { connectRabbitMQ } = require("../services/rabbitMQService");
const axios = require("axios");
const BACKEND_URI = process.env.BACKEND_URI;

const createOrder = async (req, res) => {
  try {
    const { productId, userId, quantity, price } = req.body;

    // Order total amount
    const totalAmount = price.reduce(
      (acc, curr, index) => acc + curr * quantity[index],
      0
    );

    const productResponse = await axios.get(`${BACKEND_URI}${productId}`);
    const productName = productResponse.data["name"];

    const userResponse = await axios.get(`${BACKEND_URI}user/${userId}`);

    const userMail = userResponse.data["email"];
    const newOrder = await Order.create({
      userId,
      email: userMail,
      productName,
      totalAmount,
      productName,
      userMail,
    });

    for (let i = 0; i < productId.length; i++) {
      const product = productId[i];
      const qty = quantity[i];
      const unitPrice = price[i];
      const totalPrice = qty * unitPrice;

      await OrderItem.create({
        orderId: newOrder.id,
        productId: product,
        quantity: qty,
        price: unitPrice,
        totalPrice: totalPrice,
      });
    }

    // Get the channel
    const channel = await connectRabbitMQ();
    if (!channel) {
      throw new Error("Could not connect to RabbitMQ");
    }

    // Send the message to the queue
    channel.sendToQueue(
      "ORDER",
      Buffer.from(
        JSON.stringify({
          orderId: newOrder.id,
          userId,
          productId,
          quantity,
          totalAmount,
        })
      )
    );

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getAllOrder, findOrderByUserId };
