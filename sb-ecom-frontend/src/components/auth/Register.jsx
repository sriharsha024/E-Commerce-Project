import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiOutlineUserAdd } from "react-icons/ai";
import InputField from "../shared/InputField";
import { registerNewUser } from "../../store/actions";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const registerHandler = async (data) => {
    setLoader(true);
    try {
      await dispatch(registerNewUser(data, toast, reset, navigate, setLoader));
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      setLoader(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-6">
      <form
        onSubmit={handleSubmit(registerHandler)}
        className="bg-white p-8 rounded-2xl shadow-2xl w-96 transform transition-all duration-500 hover:scale-105"
      >
        <div className="flex flex-col items-center space-y-2 mb-6">
          <AiOutlineUserAdd className="text-5xl text-green-500" />
          <h1 className="text-3xl font-bold text-gray-800">Create an Account!</h1>
          <p className="text-gray-500 text-sm">Register to get started</p>
        </div>

        <InputField
          label="Username"
          required
          id="username"
          type="text"
          message="*Username is required"
          placeholder="Enter your username"
          register={register}
          errors={errors}
          className="font-medium"
        />

        <InputField
          label="Email"
          required
          id="email"
          type="email"
          message="*Valid email is required"
          placeholder="Enter your email"
          register={register}
          errors={errors}
          className="font-medium"
        />

        <InputField
          label="Password"
          required
          id="password"
          type="password"
          min={6}
          message="*Password must be at least 6 characters"
          placeholder="Enter your password"
          register={register}
          errors={errors}
          className="font-medium"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold text-lg p-3 rounded-xl hover:shadow-lg hover:opacity-90 transition-all duration-300 mt-4 flex items-center justify-center gap-2"
          disabled={loader}
        >
          {loader ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Registering...
            </>
          ) : (
            "Register"
          )}
        </button>

        <p className="text-center text-gray-500 text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-green-500 font-semibold hover:underline">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
