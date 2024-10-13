import React from "react";
import xIcon from "../files/x.svg";

const Sidebar = ({ results, onResultClick, onClose, onGoToBottom }) => {
  return (
    <div className="w-64 h-screen bg-white shadow-lg p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Find Results</h2>
        <img
          src={xIcon}
          alt="Close"
          className="cursor-pointer text-gray-500 hover:text-gray-700 w-6 h-6"
          onClick={onClose}
        />
      </div>
      <nav className="space-y-2">
        {results.map((result, index) => (
          <button
            key={index}
            onClick={() => onResultClick(result.page_index)}
            className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition duration-300"
          >
            Page {result.page_index + 1}
          </button>
        ))}

        <button
          onClick={onGoToBottom}
          className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition duration-300"
        >
          Go to bottom
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
