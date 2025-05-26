import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function SignupPage() {
  const navigate = useNavigate();

  const handleGoogleSignup = () => {
    console.log("Simulating Google Sign-Up...");
    window.location.href = "https://idealab-beta.vercel.app/dashboard";
  };

  return (
    <div className="min-h-screen bg-black text-white flex ">
      {/* Left Section */}
      <div className="w-1/2 p-20 flex flex-col justify-center border-r border-white/10">
        <p className="text-gray-600 text-xl font-semibold">
          The future starts here.
        </p>
        <h1 className="text-4xl mb-4 font-bold tracking-tight">
          Create{" "}
          <span className="text-6xl text-white italic font-thin font-['Voyage_Bold']">
            impact.
          </span>
        </h1>
        <p className="text-gray-500 text-lg">
          Be part of the innovation revolution.
        </p>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-transparent border border-white/10 rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold text-center mb-4">
            Create an Account
          </h1>
          <p className="text-center text-gray-400 mb-8">
            Join us and start building your future.
          </p>

          <button
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center px-4 py-3 border rounded shadow-sm text-base font-regular text-white bg-black border-white/10 hover:bg-gray-900/50 duration-300 ease-in-out"
          >
            <FcGoogle className="w-6 h-6 mr-2" />
            Sign up with Google
          </button>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-500 hover:text-indigo-400"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
