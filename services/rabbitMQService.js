const amqp = require("amqplib");
require("dotenv").config();

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URI);
    const channel = await connection.createChannel();
    await channel.assertQueue("ORDER");
    console.log("Connected to RabbitMQ");

    // Consume messages from the queue (for testing purposes)
    channel.consume("ORDER", (msg) => {
      if (msg !== null) {
        console.log("Received:", msg.content.toString());
        channel.ack(msg);
      }
    });

    return channel; // Return the channel directly
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
  }
};

module.exports = { connectRabbitMQ };
