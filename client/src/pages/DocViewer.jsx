import PDFSearch from "../components/PDFSearch";
import Header from "../components/Header.jsx";

export default function DocViewer({
  file,
  query,
  hasBeenSubmitted,
  setHasSubmitted,
}) {
  return (
    <div>
      <Header />
      <PDFSearch
        file={file}
        query={query}
        hasBeenSubmitted={hasBeenSubmitted}
        setHasSubmitted={setHasSubmitted}
      />
    </div>
  );
}
