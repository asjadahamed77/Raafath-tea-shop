import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import validator from "validator";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // Validate email format
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (password.length < 8) {
    return res.json({
      success: false,
      message: "Password must be at least 8 characters long",
    });
  }
  try {
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });

    // Send response with token
    res
      .status(201)
      .json({ success: true, message: "User registered successfully", token, user });
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await userModel.findOne({email});
    if (!user){
        return res.json({ success: false, message: "User not found. Enter valid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    return res.json({
        success: true,
        message: "User login successful.",
        user,
        token
      });
     
  } catch (error) {
    console.error("Error during user login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const userLogout = async (req,res)=> {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          });
          return res.json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.error("Error during user logout:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const isAuthenticated = async (req, res) => {
    try {
      const { id } = req.params;
      
      const user = await userModel.findById(id);
      if (!user) return res.json({ success: false, message: "User not found" });
  
      return res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Authentication check failed" });
    }
  };
