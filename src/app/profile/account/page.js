"use client"
import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { sendError } from 'next/dist/server/api-utils';


const page = () => {
  const { data: session } = useSession();

  const [newUserName, setnewUserName] = useState("");

  

  // save newusername
  const handleSave = async () => {
    const response = await fetch('/api/changeusername', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "username": session.user.username, "newusername": newUserName}),
    });
    const json = await response.json();
    if (json.error) {
      alert(json.error);
    }
    else {
      alert(json.success);
      session.user.username=newUserName;
      console.log(session,newUserName);
      setUserName(newUserName);
      setnewUserName("");
    }
  }

  

  

  return (

    <div className='flex justify-center items-center'>
      <link
        href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&display=swap"
        rel="stylesheet"
      />
      <style
        dangerouslySetInnerHTML={{
          __html: "\n  * {\n  font-family: 'Source Sans Pro';\n  }\n"
        }}
      />


      <div className="w-full grid grid-cols-8 pt-3 sm:grid-cols-8">
        <div className="relative my-4 w-56 sm:hidden">
          <input
            className="peer hidden"
            type="checkbox"
            name="select-1"
            id="select-1"
          />
          <label
            htmlFor="select-1"
            className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring dark:border-gray-700 dark:text-gray-300"
          >
            Accounts
          </label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180 dark:text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <ul className="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3 dark:bg-gray-800 dark:text-gray-300">
            <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white dark:text-gray-300 dark:hover:bg-blue-700">
              Accounts
            </li>
            <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white dark:text-gray-300 dark:hover:bg-blue-700">
              Team
            </li>
            <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white dark:text-gray-300 dark:hover:bg-blue-700">
              Others
            </li>
          </ul>
        </div>

        <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow dark:bg-gray-800 dark:text-gray-300">
          <div className="pt-4">
            <h1 className="py-2 text-2xl font-semibold">Account settings</h1>
          </div>
          <hr className="mt-4 mb-8 dark:border-gray-700" />

          {/* Email Address */}


          <p className="py-2 text-xl font-semibold">Email Address</p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-gray-600 dark:text-gray-300">
              Your email address is <strong>{session.user.email}</strong>
            </p>

          </div>
          <hr className="mt-4 mb-8 dark:border-gray-700" />

          {/* Username */}
          <p className="py-2 text-xl font-semibold">Username</p>
          <div className="flex items-center">
            <div className="flex flex-col space-y-2 gap-2 sm:flex-row sm:space-y-0 sm:space-x-3">
              <label htmlFor="login-password">
                <span className="text-sm text-gray-500 dark:text-gray-300">Current Username</span>
                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600 dark:border-gray-700">
                  <input readOnly={true}
                    className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none dark:bg-gray-800 dark:text-gray-300"
                    placeholder={session.user.username}
                  />
                </div>
              </label>
              <label htmlFor="new-password">
                <span className="text-sm text-gray-500 dark:text-gray-300">New Username</span>
                <div className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600 dark:border-gray-700">
                  <input
                    value={newUserName}
                    onChange={(e) => setnewUserName(e.target.value)}
                    className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none dark:bg-gray-800 dark:text-gray-300"
                    placeholder=""
                  />
                </div>
              </label>
            </div>

          </div>

          <button disabled={newUserName == session.user.username || newUserName == ""} onClick={handleSave} className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white dark:bg-blue-400">
            Save
          </button>
          <hr className="mt-4 mb-8 dark:border-gray-700" />

          {/* Delete Account */}

          <div className="mb-10">
            <p className="py-2 text-xl font-semibold">Delete Account</p>
            <p className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600 dark:bg-rose-200 dark:text-rose-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Proceed with caution
            </p>
            <p className="mt-2">
              Make sure you have taken backup of your account in case you ever
              need to get access to your data. We will completely wipe your data.
              There is no way to access your account after this action.
            </p>
            <button className="ml-auto text-sm font-semibold text-rose-600 underline decoration-2 dark:text-rose-400">
              Continue with deletion
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default page
