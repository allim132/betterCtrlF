import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from "react";
import Home from "./pages/Home";
import DocViewer from "./pages/DocViewer";
import { FileProvider } from "./components/FileProvider";

function App() {
  const [fileName, setFileName] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [file, setFile] = useState(null);
  const [userText, setUserText] = useState("");

  return (
    <>
      <FileProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  handleSetFileName={setFileName}
                  handleHasSubmitted={setHasSubmitted}
                  handleSetFile={setFile}
                  handleSetUserText={setUserText}
                />
              }
            />
            <Route
              path="/docviewer"
              element={
                <DocViewer
                  file={file}
                  query={userText}
                  hasBeenSubmitted={hasSubmitted}
                  setHasSubmitted={setHasSubmitted}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </FileProvider>
    </>
  );
}

export default App;
