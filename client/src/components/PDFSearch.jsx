import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function PDFSearch({ file, query, hasBeenSubmitted, setHasSubmitted }) {
  const [results, setResults] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleProcessing = async () => {
    setIsLoading(true)
    setError(null)

    if (!file || !query) {
      setError("Please select a PDF file and enter a search query.")
      setIsLoading(false)
      return
    }

    const formData = new FormData()
    formData.append("file", file)
    formData.append("query", query)

    try {
      const response = await fetch("http://localhost:5000/api/search", {
        method: "POST",
        body: formData,
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setResults(data.results)
    } catch (error) {
      console.error("Fetch error:", error)
      setError("Failed to fetch. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleReturn = (e) => {
    e.preventDefault()
    setHasSubmitted(false)
    navigate("/")
  }

  useEffect(() => {
    if (hasBeenSubmitted) {
      handleProcessing()
    }
  }, [hasBeenSubmitted])

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {isLoading && <p>Loading...</p>}

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
  )
}

export default PDFSearch
