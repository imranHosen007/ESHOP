import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {" "}
      <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600">
        Oops! That page couldn't be found.
      </p>
      <Link
        to="/"
        className="px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
