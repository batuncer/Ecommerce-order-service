const express = require("express");
const orderRoutes = require("./routes/order");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { connectRabbitMQ } = require("./services/rabbitMQService");
const { connectDB } = require("./config/db");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8081;

app.use(bodyParser.json());
app.use(cors());

const initServer = async () => {
  try {
    await connectDB();
    await connectRabbitMQ();
    app.use("/", orderRoutes);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error initializing server:", error);
  }
};

initServer();
