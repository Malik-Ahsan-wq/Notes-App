import React from "react";

const Pop = ({ onClose }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-[6px] flex items-center justify-center z-50">
      {/* Modal Card */}
      <div className="bg-[#2A2B2E] py-10 h-[350px] rounded-2xl p-6 w-[90%] max-w-sm shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          title="Close Form"
          className="absolute top-2 right-3 text-white cursor-pointer  text-2xl font-bold"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Login to Your Account
        </h2>

        {/* Login Form */}
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Extra Links */}
        <div className="text-sm text-center mt-4">
          <p>
            Don't have an account?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pop;
