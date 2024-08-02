import React from 'react';

function Navbar() {
  return (
    <>
      <div className="max-w-screen-2xl mx-auto container px-6 py-3 md:px-12 shadow-lg h-16 fixed bg-gradient-to-r from-teal-400 to-cyan-500 border-b border-teal-300">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <h1 className="text-3xl font-bold flex items-center space-x-1 cursor-pointer text-white">
            <span>Word</span>
            <span className="text-4xl text-yellow-300">To</span>
            <span>PDF</span>
          </h1>
          {/* Navigation Link */}
          <h1 className="text-xl font-semibold cursor-pointer text-white transition-transform duration-300 hover:text-yellow-300 hover:scale-110">
            Home
          </h1>
        </div>
      </div>
    </>
  );
}

export default Navbar;
