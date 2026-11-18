import Order from "../model/orderModel.js";
import userModel from "../model/userModel.js";
import Razorpay from "razorpay";

const currency = "inr";

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new Order(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, {
      cartData: {},
    });
    return res.status(201).json({success: true,message: "Order placed successfully"});
  } catch (error) {
    return res.status(500).json({success: false,message: error.message});
  }
};
 

export const placeOrderRazorpay = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new Order(orderData);
    await newOrder.save();
    const options = {
      amount: Math.round(amount * 100),
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
    };
    const order = await razorpayInstance.orders.create(options);
    return res.status(200).json({success: true,message: "Razorpay order created",order});
  } catch (error) {
    return res.status(500).json({success: false,message: error.message});
  }
};


export const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const userId = req.userId;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === "paid") {
      const savedOrder = await Order.findOne({
        _id: orderInfo.receipt,
        userId,
      });
      if (!savedOrder) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }
      await Order.findByIdAndUpdate(savedOrder._id, {
        payment: true,
      });
      await userModel.findByIdAndUpdate(userId, {
        cartData: {},
      });
      return res.status(200).json({success: true,message: "Payment successful"});
    } else {
      return res.status(400).json({success: false,message: "Payment failed"});
    }
  } catch (error) {
    return res.status(500).json({success: false,message: error.message});
  }
};


export const userOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ userId });
    if (!orders) {
      return res.status(404).json({success: false,message: "No orders found"});
    }
    return res.status(200).json({success: true,message: "Orders fetched successfully",orders});
  } catch (error) {
    return res.status(500).json({success: false,message: error.message});
  }
};

//Admin
export const allOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    return res.status(200).json({success: true, message: "All orders fetched successfully",orders});
  } catch (error) {
    return res.status(500).json({success: false,message: error.message});
  }
};


export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true },
    );
    if (!order) {
      return res.status(404).json({success: false,message: "Order not found"});
    }
    return res.status(200).json({success: true,message: "Status updated successfully",order});
  } catch (error) {
    return res.status(500).json({success: false,message: error.message});
  }
};
