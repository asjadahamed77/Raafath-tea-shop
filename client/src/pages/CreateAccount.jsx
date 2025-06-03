import React, { useState } from "react";
import googleIcon from "../assets/icons/google.png";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/slices/authSlice";
import { useToast } from "../context/ToastContext";

const CreateAccount = () => {
  const dispatch = useDispatch()
  const {addToast} = useToast() 
  const { loading, error } = useSelector(state => state.auth)
  const navigate = useNavigate() 
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await dispatch(register({ name, email, password }));
  
    if (register.fulfilled.match(result)) {
      addToast("Account created successfully", "success", 3000);
      navigate("/");
    } else {
      addToast(result.payload || "Registration failed", "error", 3000);
    }
  };
  
  

  return (
    <div className="xl:px-[120px] lg:px-[40px] md:px-[20px] sm:px-[16px] px-4 py-20">
      <div className="lg:w-[618px] md:w-[550px] sm:w-[500px] w-full mx-auto sm:my-20 my-12">
        <h1 className="font-volgue font-light sm:text-[60px] text-[45px] text-center">
          Create Account
        </h1>


       
        {/* Login Form */}
        <form onSubmit={submitHandler} className="w-full mt-12">
          <input
            type="text"
            placeholder="Name"
            className="bg-transparent focus:outline-none border-b w-full p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        
          <input
            type="text"
            placeholder="Email"
            className="bg-transparent focus:outline-none border-b w-full p-2 mt-12"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Input with Toggle */}
          <div className="flex items-center justify-between mt-12 border-b">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="bg-transparent focus:outline-none w-full p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="flex items-center justify-center w-[40px] h-[40px] cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <IoIosEyeOff className="text-[20px] text-primaryColor" />
              ) : (
                <IoIosEye className="text-[20px] text-primaryColor" />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-full text-secondaryColor bg-primaryColor hover:opacity-65 duration-300 transition-opacity mt-16 text-[18px] font-light sm:h-[80px] h-[55px]"
          >
            Create Account
          </button>
        </form>

        <p className="mt-8 text-[18px] text-center font-extralight">
          Create an account? Sign in{" "}
          <Link
            to={"/login"}
            className="underline font-normal cursor-pointer hover:opacity-65 duration-300 transition-opacity"
          >
            here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CreateAccount;
