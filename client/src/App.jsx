import { useState } from "react"

import React from "react"
import Home from "./pages/home"
import DocViewer from "./pages/DocViewer"

function App() {
  const [fileName, setFileName] = useState("")
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [file, setFile] = useState(null)

  return (
    <>
      <Home
        handleSetFileName={setFileName}
        handleHasSubmitted={setHasSubmitted}
        handleSetFile={setFile}
      />
      <DocViewer fileName={fileName} hasSubmitted={hasSubmitted} file={file} />
    </>
  )
}

export default App
