import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <section className="dark:bg-gray-800 dark:text-gray-100">
        <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
          <h1 className="text-4xl font-bold leading-none sm:text-5xl">
            Power Hack
            <span className="dark:text-cyan-400"> Tech Company</span>
          </h1>
          <p className="px-8 mt-8 mb-12 text-lg">
            Very famous and big tech Company in bangladesh
          </p>
          <div className="flex flex-wrap justify-center">
            <Link to="/billing-list">
              <button className="px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-cyan-400 dark:text-gray-900">
                Get started
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
