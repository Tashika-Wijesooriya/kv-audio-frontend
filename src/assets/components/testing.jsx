import React, { useState } from "react";

export default function Testing() {
  const [count, setCount] = useState(0);
  const [file, setFile] = useState(null);

  return (
    <div className="w-full h-screen">
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Count</button>


      <input type="file" multiple onChange={(e)=>{console.log(e.target.files)}} />
      <button>Upload</button>
      <button>Download</button>
    </div>
  );
}
