const express = require("express");
const {
  createOrder,
  getAllOrder,
  findOrderByUserId,
} = require("../controller/order");

const router = express.Router();

router.get("/orders", getAllOrder);
router.post("/orders", createOrder);
// router.get("/orders/:id", findById);
router.get("/user-order", findOrderByUserId);

module.exports = router;
