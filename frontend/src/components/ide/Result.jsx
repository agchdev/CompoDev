

const Result = ({srcCode}) => {
  return (
    <div>
        <div className="bg-gray-900 p-1 shadow mt-1 rounded-lg">
            <h2
                className="text-lg font-semibold mb-1 text-white">
                Result
            </h2>
            <iframe
                className="w-full h-screen border border-gray-700 rounded-md bg-white"
                srcDoc={srcCode}
                title="output"
                sandbox="allow-scripts"
                width="100%"
                height="100vh"
            >
            </iframe>
        </div>
    </div>
)
}

export default Result
