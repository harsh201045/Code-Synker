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
      <div className='flex items-center space-x-2'>
        <Image src={logo3} alt="Code-Synker Logo" width={40} height={40} />
        <div className='font-bold text-lg'>Code-Synker</div>
      </div>
      <div>
        {session ? (
          <button
            className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2'
            onClick={() => signOut()}
          >
            LogOut
          </button>
        ) : (
          <Link href="/login">
            <button
              className='text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2'
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
