

import { Inter } from "next/font/google";
import '../globals.css';

export const metadata = {
    title: "Profile Page",
    description: "Sync Your code now!!!!",
};

export default function ProfileLayout({ children }) {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 h-screen px-4 py-8 overflow-y-auto bg-gray-800 border-r dark:border-gray-700 sticky top-16">
      {/* Sidebar content */}
      <div className="flex flex-col items-center mt-6 -mx-2">
        <img className="object-cover w-24 h-24 mx-2 rounded-full" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="avatar" />
        <h4 className="mx-2 mt-2 font-medium text-gray-200">John Doe</h4>
        <p className="mx-2 mt-1 text-sm font-medium text-gray-400">john@example.com</p>
      </div>

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          {/* Sidebar navigation links */}
          <a className="flex items-center px-4 py-2 text-gray-200 bg-gray-700 rounded-lg" href="#">
            <span className="mx-4 font-medium">Dashboard</span>
          </a>
          <a className="flex items-center px-4 py-2 mt-5 text-gray-400 transition-colors duration-300 transform rounded-lg hover:bg-gray-700 hover:text-gray-200" href="#">
            <span className="mx-4 font-medium">Accounts</span>
          </a>
          <a className="flex items-center px-4 py-2 mt-5 text-gray-400 transition-colors duration-300 transform rounded-lg hover:bg-gray-700 hover:text-gray-200" href="#">
            <span className="mx-4 font-medium">Tickets</span>
          </a>
          <a className="flex items-center px-4 py-2 mt-5 text-gray-400 transition-colors duration-300 transform rounded-lg hover:bg-gray-700 hover:text-gray-200" href="#">
            <span className="mx-4 font-medium">Settings</span>
          </a>
        </nav>
      </div>
    </aside>

<main className="flex-1 p-8">
<h1 className="text-3xl font-bold text-white">Profile Page Content</h1>
{children}
</main>
</div>
);
}
