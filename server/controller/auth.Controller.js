import validator from "validator";
import bcrypt from "bcryptjs";
import { genToken, genToken1 } from "../utils/token.js";
import userModel from "../model/userModel.js";

export const ragister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.status(400).json({ success: false, message: "User already exist" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Enter valid email" });
    }
    if (!password || password.length < 8){
      return res.status(400).json({ success: false, message: "Enter Strong Password" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({ name, email, password: hashPassword });

    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({success: true,message: "User registered successfully",user});
  } catch (error) {
    return res.status(500).json({success: false,message: error.message});
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User is not found" });
    }
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Incorrect password" });
    }
    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({success: true,message: "User login successfully",user});
  } catch (error) {
    return res.status(500).json({success: false,message: error.message});
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });
    return res.status(200).json({success:true, message:"logout successful"})
  } catch (error) {
return res.status(500).json({success:false, message:error.message})
  }
};


export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }
    if (
      email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = await genToken1(email);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite:
          process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({success: true, message: "Admin login successful"});
    }
    return res.status(400).json({success: false,message: "Invalid credentials"});
  } catch (error) {
    return res.status(500).json({success: false, message: error.message});
  }
};