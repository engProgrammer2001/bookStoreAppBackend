const Order = require("../models/order.model");
const User = require("../models/user.model");

const placeOrder = async (req, res) => {
  try {
    // extract userId from req.user
    const userId = req.user.userId.id;

    // extract order details from req.body.order
    const { order } = req.body; // Destructure order from req.body

    // Ensure the order is an array
    if (!order || !Array.isArray(order)) {
      return res.status(400).json({ message: "Order should be an array of items" });
    }
    for (const userData of order) {
      const newOrder = new Order({
        user: userId,
        book: userData._id,
      });
      const orderDataFromDb = await newOrder.save();

      // saving order in user model
      await User.findByIdAndUpdate(userId, {
        $push: {
          orders: orderDataFromDb._id,
        },
      });
      // clear cart
      await User.findByIdAndUpdate(userId, {
        $pull: {
          cart: userData._id,
        },
      });
    }

    return res.status(200).json({ status: "success", message: "Order placed successfully" });
  } catch (error) {
    console.log("placeOrder controller error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


// get order history of user
const getOrderHistory = async (req, res) => {
  try {
    // extract userId from req.user
    const userId = req.user.userId.id;
    // find the user using userId
    const userData = await User.findById(userId).populate({path : "orders", populate : {path : "book"}});
    const orderData = userData.orders.reverse();

    return res.status(200).json({ status: "success", orderData });
  } catch (error) {
    console.log("getOrderHistory controller error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// get all order history for admin
const getAllOrderHistory = async (req, res) => {
  try {
    const orderData = await Order.find().populate({path : "book"}).populate({path : "user"}).sort({createdAt : -1});
    return res.status(200).json({ status: "success", orderData });

  } catch (error) {
    console.log("getAllOrderHistory controller error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// update order status
const updateOrderStatus = async (req, res) => {
  try {
    const userId = req.user.userId.id;
    // check role of user
    const user = await User.findById(userId);
    if (user.role !== "admin") {
      return res.status(401).json({ message: "you don't have admin access" });
    }

    // update order status
    const orderId = req.params.id;
    const orderData = await Order.findByIdAndUpdate(orderId, { status: req.body.status });
    if(!orderData){
      return res.status(404).json({ message: "order not found with this id" });
    }
    return res.status(200).json({ message: "order status updated successfully", orderData: orderData });
    s
  } catch (error) {
    console.log("updateOrderStatus controller error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



module.exports = {
  placeOrder,
  getOrderHistory,
  getAllOrderHistory,
  updateOrderStatus
};


