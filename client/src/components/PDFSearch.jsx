import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const highlightWords = (content) => {
  return content.replace(
    /\*\*(.*?)\*\*/g,
    '<span class="bg-yellow-200 px-1 rounded">$1</span>'
  );
};
import Sidebar from "./sidebar.jsx";

function PDFSearch({ file, query, hasBeenSubmitted, setHasSubmitted }) {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);
  const navigate = useNavigate();
  const { pageNumber } = useParams();
  const pageRefs = useRef({});
  const bottomRef = useRef(null);

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

  const handleResultClick = (pageIndex) => {
    setSelectedPage(pageIndex);
    scrollToPage(pageIndex);
  };

  const scrollToPage = (pageIndex) => {
    const element = pageRefs.current[pageIndex];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (hasBeenSubmitted) {
      handleProcessing();
    }
  }, [hasBeenSubmitted]);

  useEffect(() => {
    if (pageNumber && results.length > 0) {
      const pageIndex = parseInt(pageNumber) - 1;
      setSelectedPage(pageIndex);
      scrollToPage(pageIndex);
    }
  }, [pageNumber, results]);

  return (
    <div className="flex h-screen overflow-hidden">
      {sidebarOpen && (
        <Sidebar
          results={results}
          onResultClick={handleResultClick}
          onClose={() => setSidebarOpen(false)}
          onGoToBottom={scrollToBottom}
        />
      )}
      <div
        className={`flex-1 p-6 ${sidebarOpen ? "ml-2" : ""} overflow-y-auto`}
      >
        {error && <p style={{ color: "red" }}>{error}</p>}

        {isLoading && <p>Loading...</p>}

        {results.length > 0 && (
          <div className="bg-gray-100 rounded-lg p-6 mt-6 shadow-md">
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-blue-500 text-gray-800">
              Search Results:
            </h2>
            <div className="flex justify-between items-center mb-4 bg-white p-2 rounded-md shadow-sm">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                {sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
              </button>
              <div className="text-center">
                {selectedPage !== null
                  ? `Page ${selectedPage + 1}`
                  : "No page selected"}
              </div>
              <div>{/* Empty right section */}</div>
            </div>
            {results.map((result, index) => (
              <div
                key={index}
                ref={(el) => (pageRefs.current[result.page_index] = el)}
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
                  dangerouslySetInnerHTML={{
                    __html: highlightWords(result.highlighted_content),
                  }}
                />
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleReturn} className="mt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Return to home
          </button>
        </form>
        <div ref={bottomRef} className="h-1" />
      </div>
    </div>
  );
}

export default PDFSearch;
