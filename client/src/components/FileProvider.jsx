import React, { createContext, useState, useContext } from "react"

const FileContext = createContext()

export const FileProvider = ({ children }) => {
  const [file, setFile] = useState(null)

  return (
    <FileContext.Provider value={{ file, setFile }}>
      {children}
    </FileContext.Provider>
  )
}

export const useFile = () => useContext(FileContext)
