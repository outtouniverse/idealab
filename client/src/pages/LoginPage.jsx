import React from 'react';
import { FcGoogle } from "react-icons/fc";

function LoginPage({ onLogin }) {
  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Left Section */}
      <div className="w-1/2 p-20 flex flex-col justify-center border-r border-white/10">
        <p className="text-gray-600 text-xl font-semibold">
          Welcome to the future.
        </p>
        <h1 className="text-4xl mb-4 font-bold tracking-tight">
          Build{" "}
          <span className="text-6xl text-white italic font-thin font-['Voyage_Bold']">
            smarter.
          </span>
        </h1>
        <p className="text-gray-500 text-lg">
          Join thousands of innovators shaping tomorrow's world.
        </p>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-transparent border border-white/10 rounded shadow-xl">
          <h1 className="text-3xl font-bold text-center mb-4">Welcome Back</h1>
          <p className="text-center text-gray-400 mb-8">
            Sign in to continue your journey.
          </p>

          <button
            onClick={onLogin}
            className="w-full flex items-center justify-center px-4 py-3 border rounded shadow-sm text-base font-regular text-white bg-black border-white/10 hover:bg-gray-900/50 duration-300 ease-in-out"
          >
            <FcGoogle className="w-6 h-6 mr-2" />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
