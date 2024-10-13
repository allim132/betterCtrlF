export default function Welcome() {
  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">
          Welcome to Better Ctrl+F
        </h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Get relevant content from your PDFs
          </h2>
          <p className="text-gray-600 mb-4">
            Better Ctrl+F is your go-to tool for extracting valuable information
            from PDF documents. Our algorithm allows you to quickly find and
            analyze content within your PDFs, saving you time and enhancing your
            productivity.
          </p>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Key Features:
          </h3>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>Navigation bar</li>
            <li>Content snippits with highlighted annotations</li>
            <li>Fast searching</li>
          </ul>
          <p className="text-gray-600">
            Get started by uploading your PDF and entering a search query. Our
            system will do the rest, providing you with relevant results and
            insights from your document.
          </p>
        </div>
      </div>
    </div>
  )
}
