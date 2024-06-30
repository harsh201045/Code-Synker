"use client"
import React from "react";
import { useState } from "react";
import "./globals.css";
export default function Home() {
  // return (
  //   <div className="flex justify-center flex-col items-center text-white h-[44vh]">
  //     <div className="font-bold text-3xl">
  //       Now Sync your Code
  //     </div>
  //     <p className="text-s">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident, sapiente!</p>
  //     <div>
  //       <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Create New Project</button>
  //       <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Upload Project</button>
  //     </div>
  //   </div>
  // );
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div className="flex justify-center flex-col items-center text-white h-screen">
      <div className="font-bold text-4xl mb-4">
        Sync Your Code Effortlessly
      </div>
      <p className="text-lg mb-6 text-gray-400">
        Manage and synchronize your projects seamlessly with our intuitive platform.
      </p>
      <div>
        <button 
          type="button" 
          className="text-white bg-gradient-to-br from-blue-600 to-purple-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Create New Project
        </button>
        <button 
          type="button" 
          className="text-white bg-gradient-to-br from-blue-600 to-purple-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={handleUploadClick}
        >
          Upload Project
        </button>
        <input 
          type="file" 
          id="fileInput" 
          className="hidden" 
          webkitdirectory="" 
          mozdirectory="" 
          onChange={handleFileChange}
        />
      </div>
      {file && <div className="mt-4 text-gray-400">Selected file: {file.name}</div>}
    </div>
  );
}

// import React, { useState } from "react";
// import "./globals.css";

// export default function Home() {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleUploadClick = () => {
//     document.getElementById('fileInput').click();
//   };

//   return (
//     <div className="flex justify-center flex-col items-center text-white h-screen bg-gray-900">
//       <div className="font-bold text-4xl mb-4">
//         Sync Your Code Effortlessly
//       </div>
//       <p className="text-lg mb-6 text-gray-400">
//         Manage and synchronize your projects seamlessly with our intuitive platform.
//       </p>
//       <div>
//         <button 
//           type="button" 
//           className="text-white bg-gradient-to-br from-blue-600 to-purple-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//         >
//           Create New Project
//         </button>
//         <button 
//           type="button" 
//           className="text-white bg-gradient-to-br from-blue-600 to-purple-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
//           onClick={handleUploadClick}
//         >
//           Upload Project
//         </button>
//         <input 
//           type="file" 
//           id="fileInput" 
//           className="hidden" 
//           webkitdirectory="" 
//           mozdirectory="" 
//           onChange={handleFileChange}
//         />
//       </div>
//       {file && <div className="mt-4 text-gray-400">Selected file: {file.name}</div>}
//     </div>
//   );
// }
