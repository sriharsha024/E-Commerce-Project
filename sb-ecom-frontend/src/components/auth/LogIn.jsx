import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiOutlineLogin } from "react-icons/ai";
import InputField from "../shared/InputField";
import { useDispatch } from "react-redux";
import { authenticateSignInUser } from "../../store/actions";
import toast from "react-hot-toast";

const LogIn = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
    });

    const loginHandler = async (data) => {
        console.log("Login Clicked");
        setLoader(true);
        dispatch(authenticateSignInUser(data, toast, reset, navigate, setLoader));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-6">
            <form
                onSubmit={handleSubmit(loginHandler)}
                className="bg-white p-8 rounded-2xl shadow-2xl w-96 transform transition-all duration-500 hover:scale-105"
            >
                <div className="flex flex-col items-center space-y-2 mb-6">
                    <AiOutlineLogin className="text-5xl text-blue-500" />
                    <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
                    <p className="text-gray-500 text-sm">Sign in to continue</p>
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
                    label="Password"
                    required
                    id="password"
                    type="password"
                    message="*Password is required"
                    placeholder="Enter your password"
                    register={register}
                    errors={errors}
                    className="font-medium"
                />

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-lg p-3 rounded-xl hover:shadow-lg hover:opacity-90 transition-all duration-300 mt-4 flex items-center justify-center gap-2"
                    disabled={loader}
                >
                    {loader ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Logging in
                        </>
                    ) : (
                        "Login"
                    )}
                </button>

                <p className="text-center text-gray-500 text-sm mt-4">
                    Don't have an account? <a href="/register" className="text-blue-500 font-semibold hover:underline">Sign up</a>
                </p>
            </form>
        </div>
    );
};

export default LogIn;
