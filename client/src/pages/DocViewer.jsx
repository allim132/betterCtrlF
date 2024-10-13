import PDFSearch from "../components/PDFSearch"

export default function DocViewer({ file, query }) {
  return (
    <div>
      <PDFSearch file={file} query={query} />
    </div>
  )
}
