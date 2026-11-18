import userModel from "../model/userModel.js";

export const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userId = req.userId;
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({success: false,message: "User not found"});
    }
    const cartData = userData.cartData;
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    return res.status(200).json({success: true,message: "Added to cart"});
  } catch (error) {
    return res.status(500).json({success: false,message: error.message});
  }
};

export const updateToCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const userId = req.userId;
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({success: false,message: "User not found"});
    }
    const cartData = userData.cartData;
    if (!cartData[itemId] || !cartData[itemId][size]) {
      return res.status(404).json({success: false,message: "Cart item not found"});
    }
    cartData[itemId][size] = quantity;
    await userModel.findByIdAndUpdate(userId, { cartData });
    return res.status(200).json({success: true,message: "Cart updated"});
  } catch (error) {
    return res.status(500).json({success: false,message: error.message});
  }
};

export const getUserCart = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({success: false,message: "User not found"});
    }
    const cartData = userData.cartData;
    return res.status(200).json({success: true,message: "Cart fetched successfully",cartData});
  } catch (error) {
    return res.status(500).json({success: false,message: error.message});
  }
};
