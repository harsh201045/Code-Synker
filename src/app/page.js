
"use client";
import React, { useState } from "react";
import "./globals.css";
import { useSession } from "next-auth/react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [projectName, setProjectName] = useState('');
  const { data: session } = useSession();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleButtonClick = () => {
    if (!session) {
      window.location.href = '/login';
    } else {
      setShowPopup(true);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/project/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "owner": session.user.username, "name": projectName }),
    });
    const json = await response.json();
    if (json.error) {
      alert(json.error);
    } else {
      alert(json.success);
    }
    setShowPopup(false);
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
          onClick={handleButtonClick}
        >
          Create New Project
        </button>

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75">
            <div className="bg-gray-800 p-5 rounded-lg">
              <form onSubmit={handleFormSubmit}>
                <label htmlFor="projectName" className="block mb-2 text-sm font-medium text-gray-300">
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="block w-full p-2 mb-4 border rounded-md bg-gray-700 text-white"
                  required
                />
                <div className="flex justify-center items-center">
                  <button
                    type="submit"
                    className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 text-center"
                    onClick={() => setShowPopup(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <button
          type="button"
          className="text-white bg-gradient-to-br from-blue-600 to-purple-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={()=>{
            if (!session) {
              window.location.href = '/login';
            }
            handleUploadClick();
          }}
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
