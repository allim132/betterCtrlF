import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PDFSearch({ file, query, hasBeenSubmitted, setHasSubmitted }) {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleProcessing = async () => {
    setIsLoading(true);
    setError(null);

    if (!file || !query) {
      setError("Please select a PDF file and enter a search query.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("query", query);

    try {
      const response = await fetch("http://localhost:5000/api/search", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to fetch. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReturn = (e) => {
    e.preventDefault();
    setHasSubmitted(false);
    navigate("/");
  };

  useEffect(() => {
    if (hasBeenSubmitted) {
      handleProcessing();
    }
  }, [hasBeenSubmitted]);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {isLoading && <p>Loading...</p>}

      {results.length > 0 && (
        <div className="bg-gray-100 rounded-lg p-6 mt-6 shadow-md">
          <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-blue-500 text-gray-800">
            Search Results:
          </h2>
          {results.map((result, index) => (
            <div
              key={index}
              className="bg-white rounded-md p-4 mb-4 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="text-lg font-semibold text-blue-600 mb-2">
                Page {result.page_index + 1}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                Similarity Score: {result.similarity_score.toFixed(4)}
              </p>
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: result.highlighted_content }}
              />
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleReturn}>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Return to home
        </button>
      </form>
    </div>
  );
}

export default PDFSearch;
