import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div>
      <div className="mx-auto flex justify-center my-5">
        <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-900 text-gray-100">
          <h1 className="text-2xl font-bold text-center">Sign Up</h1>
          <form
            noValidate=""
            action=""
            className="space-y-6 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-1 text-sm">
              <label htmlFor="username" className="block text-gray-400">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                className="w-full px-4 py-3 rounded-md border-white  text-gray-100"
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="email" className="block text-gray-400">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="w-full px-4 py-3 rounded-md border-white  text-gray-100"
              />
            </div>
            <div className="space-y-1 text-sm">
              <label htmlFor="password" className="block text-gray-400">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-md border-white  text-gray-100 "
              />
            </div>
            <button className="block w-full p-3 text-center rounded-sm text-gray-900 bg-cyan-400">
              Sign up
            </button>
          </form>

          <p className="text-xs text-center sm:px-6 text-gray-400">
            Already have an account?
            <Link
              rel="noopener noreferrer"
              to="/login"
              className="underline text-gray-100"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
