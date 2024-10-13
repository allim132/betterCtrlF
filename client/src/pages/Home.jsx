import Header from "../components/header"
import FileSubmit from "../components/fileSubmit"

export default function Home() {
  return (
    <div>
      <Header />
      <h2 className="flex items-center justify-center p-10 ">
        Simply insert a pdf and type in your search!
      </h2>
      <FileSubmit />
    </div>
  )
}
