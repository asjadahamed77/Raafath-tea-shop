import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import validator from 'validator';

export const registerUser = async (req,res) => {
    const {firstName, lastName, email, password} = req.body;
    if(!firstName || !lastName || !email || !password) {
        return res.status(400).json({message: "All fields are required"});
    }
     // Validate email format
     if (!validator.isEmail(email)) {
        return res.status(400).json({message: "Invalid email format"});
    }

    if (password.length < 8) {
        return res.json({
          success: false,
          message: "Password must be at least 8 characters long",
        });
      }
    try {
       

        // Check if user already exists
        const existingUser = await userModel.findOne({email});
        if (existingUser) {
            return res.status(400).json({message: "User already exists"});
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new userModel({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await user.save();

        // Generate JWT token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '3d'});

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
          });

        // Send response with token
        res.status(201).json({message: "User registered successfully", token, user});
        
    } catch (error) {
        console.error("Error during user registration:", error);
        return res.status(500).json({message: "Internal server error"});      
    }
}