import React, { useState } from "react";
import googleIcon from "../assets/icons/google.png";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="xl:px-[120px] lg:px-[40px] md:px-[20px] sm:px-[16px] px-4 py-20">
      <div className="lg:w-[618px] md:w-[550px] sm:w-[500px] w-full mx-auto sm:my-20 my-12">
        <h1 className="font-volgue font-light sm:text-[60px] text-[45px] text-center">
          Account
        </h1>

        {/* Google Sign In */}
        <div className="flex items-center justify-center gap-6 border-[1px] rounded-[10px] w-full sm:h-[80px] h-[55px] mt-12 hover:opacity-65 duration-300 transition-opacity cursor-pointer">
          <img src={googleIcon} alt="Google" className="w-[40px] h-[40px]" />
          <p className="text-[18px] font-light">Sign in with Google</p>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <p className="flex-1 h-[1px] bg-primaryColor"></p>
          <p>or</p>
          <p className="flex-1 h-[1px] bg-primaryColor"></p>
        </div>

        {/* Login Form */}
        <form className="w-full mt-12">
          <input
            type="text"
            placeholder="Email"
            className="bg-transparent focus:outline-none border-b w-full p-2"
          />

          {/* Password Input with Toggle */}
          <div className="flex items-center justify-between mt-12 border-b">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="bg-transparent focus:outline-none w-full p-2"
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

          <button className="w-full rounded-full text-secondaryColor bg-primaryColor hover:opacity-65 duration-300 transition-opacity mt-12 text-[18px] font-light sm:h-[80px] h-[55px]">
            Sign in
          </button>
        </form>

        <p className="mt-12 text-[18px] underline text-center font-extralight cursor-pointer hover:opacity-65 duration-300 transition-opacity">
          Forgot Password?
        </p>

        <p className="mt-8 text-[18px] text-center font-extralight">
          Don’t have an account? Sign up{" "}
          <Link
            to={"/create-account"}
            className="underline font-normal cursor-pointer hover:opacity-65 duration-300 transition-opacity"
          >
            here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
