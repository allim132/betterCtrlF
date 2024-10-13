import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FileSubmit({
  handleSetFileName,
  handleHasSubmitted,
  handleSetFile,
  handleSetUserText,
}) {
  const navigate = useNavigate();
  const [userText, setUserText] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTextChange = (event) => {
    setUserText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (file) {
      handleSetFileName(file.name);
      handleSetFile(file);
      handleHasSubmitted(true);
      handleSetUserText(userText);

      console.log("File submitted:", file);
      console.log("User text:", userText);

      // Navigate to the docviewer page
      navigate("/docviewer");
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Upload PDF</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="pdf"
            >
              Select PDF
            </label>
            <input
              type="file"
              id="pdf"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="userText"
            >
              Enter Prompt
            </label>
            <input
              type="text"
              id="userText"
              value={userText}
              onChange={handleTextChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#3c799a] text-white py-2 px-4 rounded hover:bg-[#3c799a] focus:outline-none focus:ring-2 focus:ring-[#3c799a]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
