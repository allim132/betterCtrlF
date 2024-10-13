import React from "react";
import xIcon from "../files/x.svg";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-4 overflow-y-auto relative">
      <img
        src={xIcon}
        alt="Close"
        className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-700 w-6 h-6"
      />
      <h2 className="text-xl font-bold mb-4">Find Results</h2>
      <nav className="space-y-2">
        <button className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition duration-300">
          Section 1
        </button>
        <button className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition duration-300">
          Section 2
        </button>
        <div>
          <button className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition duration-300">
            Section 3
          </button>
        </div>
        <button className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition duration-300">
          Section 4
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
