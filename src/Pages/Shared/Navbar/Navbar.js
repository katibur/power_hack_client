import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images.jpg";

const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between bg-slate-300 px-10 py-3">
        <div className="flex flex-col items-center justify-center">
          <div className="flex space-x-5">
            <Link to="/">
              <img
                alt=""
                className="w-12 h-12 rounded-full ring-2 ring-offset-4 dark:bg-gray-500 ring-cyan-400 ring-offset-gray-800"
                src={logo}
              />
            </Link>
          </div>
        </div>

        <p className="text-black text-lg">{paidAmount}</p>
        <Link to="/login">
          <button
            type="button"
            className="px-8 py-3 font-semibold rounded-full dark:bg-gray-100 dark:text-gray-800"
          >
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
