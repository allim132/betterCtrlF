import { useState } from "react"

import React from "react"
import Home from "./pages/home"
import DocViewer from "./pages/DocViewer"

function App() {
  const [fileName, setFileName] = useState("")
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [file, setFile] = useState(null)
  const [userText, setUserText] = useState("")

  return (
    <>
      <Home
        handleSetFileName={setFileName}
        handleHasSubmitted={setHasSubmitted}
        handleSetFile={setFile}
        handleSetUserText={setUserText}
      />
      <DocViewer file={file} query={userText} hasBeenSubmitted={hasSubmitted} />
    </>
  )
}

export default App
