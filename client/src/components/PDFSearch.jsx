import React, { useState } from "react";

function PDFSearch() {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    }
  };

  return (
    <div>
      <h1>PDF Search</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">Select PDF file:</label>
          <input
            type="file"
            id="file"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label htmlFor="query">Search query:</label>
          <input
            type="text"
            id="query"
            value={query}
            onChange={handleQueryChange}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {results.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          {results.map((result, index) => (
            <div key={index}>
              <h3>Page {result.page_index + 1}</h3>
              <p>Similarity Score: {result.similarity_score.toFixed(4)}</p>
              <div
                dangerouslySetInnerHTML={{ __html: result.highlighted_content }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PDFSearch;
