"use client"
import { Inter } from "next/font/google";
import '../globals.css';
import Link from "next/link";
import nextAuth from "next-auth";
import { useSession } from "next-auth/react";
// import Head from "next/head";
import { useEffect } from "react";
import { useState } from "react";



export default function ProfileLayout({ children }) {

    const { data: session } = useSession();


    useEffect(() => {
        if (session) {
            document.title = `${session.user.name} - CodeSynker`;
        }
    }, [session]);

    if (!session) {
        return <div>Loading...</div>;
    }


    return (

        <>
            <div className="flex min-h-screen flex-col">
                <div className="flex flex-1">
                    <aside className="w-64 h-screen sticky top-16 px-4 py-8 overflow-y-auto bg-gray-800 border-r rtl:border-r-0 rtl:border-l dark:border-gray-700">
                        <div className="flex flex-col items-center mt-6 -mx-2">
                            <img className="object-cover w-24 h-24 mx-2 rounded-full" src={session.user.image} alt="avatar" />
                            <h4 className="mx-2 mt-2 font-medium text-gray-200 text-lg">{session.user.username}</h4>
                            <p className="mx-2 mt-1 text-sm font-medium text-gray-400">{session.user.email}</p>
                        </div>
                        <div className="flex flex-col justify-between flex-1 mt-6 text-lg">
                            <nav className="flex flex-col gap-3">
                                <Link className="flex items-center px-4 py-2 rounded-lg text-gray-400 transition-colors duration-300 transform hover:bg-gray-700 hover:text-gray-200" href="/profile">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="mx-4 font-medium">Projects</span>
                                </Link>

                                <Link className="flex items-center px-4 py-2 rounded-lg text-gray-400 transition-colors duration-300 transform hover:bg-gray-700 hover:text-gray-200" href="/profile/account">
                                    <svg fill="none" className="w-5 h-5" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="mx-4 font-medium">Account</span>
                                </Link>
                                {/* <Link className="flex items-center px-4 py-2 rounded-lg text-gray-400 transition-colors duration-300 transform hover:bg-gray-700 hover:text-gray-200" href="/profile/settings">
                                    <svg fill="none" className="w-5 h-5" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="mx-4 font-medium">Settings</span>
                                </Link> */}
                                
                                <Link className="flex items-center px-4 py-2 rounded-lg text-gray-400 transition-colors duration-300 transform hover:bg-gray-700 hover:text-gray-200" href="/profile/requests">
                                    <svg fill="#ADB0B2" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v25.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm0 96c61.9 0 112 50.1 112 112v25.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V208c0-61.9 50.1-112 112-112zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z" />
                                    </svg>
                                    <span className="mx-4 font-medium">Requests</span>
                                </Link>

                                <Link className="flex items-center px-4 py-2 rounded-lg text-gray-400 transition-colors duration-300 transform hover:bg-gray-700 hover:text-gray-200" href="/profile/feedback">
                                <svg fill="#ADB0B2" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/>
                                </svg>
                                <span className="mx-4 font-medium">Feedback</span>
                                </Link>


                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="ml-18 w-full flex-1 p-8 text-white">

                        {children}
                    </main>
                </div>


                {/* Footer */}
            </div>
        </>
    );
}


