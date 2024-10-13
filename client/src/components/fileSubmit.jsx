import React, { useState } from "react"

export default function FileSubmit({
  handleSetFileName,
  handleHasSubmitted,
  handleSetFile,
}) {
  const [file, setFile] = useState(null)
  const [userText, setUserText] = useState("") // New state for user text input

  const handleFileChange = (event) => {
    setFile(event.target.files)
  }

  const handleTextChange = (event) => {
    setUserText(event.target.value) // Update state with user input
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (file) {
      handleSetFileName(file.name)
      handleSetFile(file)
      handleHasSubmitted(true)

      console.log("File submitted:", file)
      console.log("User text:", userText) // Log the user input text
    } else {
      console.log("No file selected")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
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
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
