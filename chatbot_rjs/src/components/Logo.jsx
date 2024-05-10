import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center mb-6 mx-auto text-2xl font-semibold text-gray-900 dark:text-white"
    >
      <img className="w-8 h-8 mr-2" src="/favicon-32x32.png" alt="logo" />
      DocTalk
    </Link>
  );
};

export default Logo;
