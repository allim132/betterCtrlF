import PDFViewer from "../components/PDFViewer"
import { useState, useEffect } from "react"

export default function DocViewer({ fileName, file, hasSubmitted }) {
  const [url, setUrl] = useState(null)

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file)
      setUrl(objectUrl)

      // Clean up the object URL when the component unmounts or file changes
      return () => URL.revokeObjectURL(objectUrl)
    }
  }, [file])

  return <div>{hasSubmitted && url && <PDFViewer fileURL={url} />}</div>
}
