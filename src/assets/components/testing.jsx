import React, { useState } from "react";
import mediaUpload from "../../utils/mediaUpload";

export default function Testing() {
  const [count, setCount] = useState(0);
  const [file, setFile] = useState(null);

  function uploadFile() {
    console.log(file);
    mediaUpload(file);
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{count}</h1>
      <button
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
      >
        Count
      </button>

      <div className="mt-6 flex flex-col items-center space-y-4">
        <input
          type="file"
          multiple
          onChange={(e) => setFile(e.target.files[0])}
          className="p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={uploadFile}
          className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition"
        >
          Upload
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition">
          Download
        </button>
      </div>
    </div>
  );
}
