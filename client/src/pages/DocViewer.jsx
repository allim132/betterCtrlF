import PDFSearch from "../components/PDFSearch"

export default function DocViewer({
  file,
  query,
  hasBeenSubmitted,
  setHasSubmitted,
}) {
  return (
    <div>
      <PDFSearch
        file={file}
        query={query}
        hasBeenSubmitted={hasBeenSubmitted}
        setHasSubmitted={setHasSubmitted}
      />
    </div>
  )
}
