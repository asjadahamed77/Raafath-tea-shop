import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName:{
        type: String,
      required: true,
   
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address."],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    phone: {
        type: String,
     
        match: [/^\d{10}$/, "Please enter a valid phone number."],
    },
  
    address: {
        
            addressLine: {
              type: String,
              default:""
              
            },
            city: {
              type: String,
              default:""
           
            },
          
      
           
          },
    
  },
  {
    timestamps: true,
  }
);


const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;