import Header from "../components/header"
import FileSubmit from "../components/fileSubmit"
import Welcome from "../components/Welcome"
export default function Home({
  handleSetFileName,
  handleHasSubmitted,
  handleSetFile,
  handleSetUserText,
}) {
  return (
    <div>
      <Header />
      <Welcome />
      <h2 className="flex items-center justify-center p-5">
        Simply insert a pdf and type in your search!
      </h2>
      <FileSubmit
        handleSetFileName={handleSetFileName}
        handleHasSubmitted={handleHasSubmitted}
        handleSetFile={handleSetFile}
        handleSetUserText={handleSetUserText}
      />
    </div>
  )
}
