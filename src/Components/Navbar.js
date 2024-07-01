"use client";
import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import Link from 'next/link';
import Image from 'next/image';
import logo3 from '../logo3.png';


const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className='bg-gray-900 text-white flex justify-between items-center px-4 h-16 sticky top-0 z-10'>
      <Link href="/">
        <div className='flex items-center space-x-2'>
          <Image src={logo3} alt="Code-Synker Logo" width={40} height={40} />
          <div className='font-bold text-lg'>Code-Synker</div>
        </div>
      </Link>
      <div>
        {session ? (
          <div className='flex items-center h-full   gap-1.5'>
            <Link href="/profile">
              <img className="object-cover w-10 h-10 mx-2 rounded-full" src={session.user.image} alt="avatar" />
            </Link>
            {/* <button
              className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              onClick={() => signOut()}
            >
              LogOut
            </button> */}
            <div className="relative group">
              <svg
                onClick={() => signOut()}
                className='cursor-pointer'
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                width="32"
                height="32"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:block">
                <div className="bg-gray-700 text-white text-sm rounded py-1 px-2">
                  Logout
                </div>
                <div className="w-3 h-3 bg-gray-700 absolute bottom-full left-1/2 transform -translate-x-1/2 -rotate-45"></div>
              </div>
            </div>


          </div>
        ) : (
          <Link href="/login">
            <button
              className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center '
            >
              Login
            </button>

          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
