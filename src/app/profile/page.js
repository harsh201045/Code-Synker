'use client'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSession } from 'next-auth/react'
import '../globals.css';

const page = () => {
  const { data: session } = useSession();
  const [projects, setProjects] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [userName, setuserName] = useState('');
  const [projectIndex, setprojectIndex] = useState(-1);

  const handlebutton = (index) => {
    setShowPopup(true);
    setprojectIndex(index);
  }


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/request/invite', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "from": session.user.id, "to": userName, "name": projects[projectIndex].name }),
    });
    const json = await response.json();
    if (json.error) {
      alert(json.error);
    } else {
      alert(json.success);
    }
    setShowPopup(false);
  }


  const fetchProjects = async () => {
    const response = await fetch('/api/project/fetch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "id": session.user.id }),
    });
    const json = await response.json();
    setProjects(json.success);
  }

  const handleProjectDelete = async (i) => {
    const response = await fetch('/api/project/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "id": session.user.id, "name": projects[i].name, "owner": projects[i].owner }),
    });
    const json = await response.json();
    if (json.error) {
      alert(json.error);
    }
    else {
      await fetchProjects();
      alert("project deleted successfully");
    }
  }

  useEffect(() => {
    fetchProjects();
  }, [session]);

  return (
    <>
      <h1 className="text-3xl font-bold mb-5">Projects</h1>
      <div className='text-white '>
        <div className=" overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className='text-lg'>
                <th scope="col" className="px-6 py-3">
                  Sr No.
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    Name
                    <a href="#">
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    Owner
                    <a href="#">
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    Last Updated
                    <a href="#">
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {projects?.map((project, index) => {
                return (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-2 font-medium text-lg text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </th>
                    <td className="px-6 py-2 text-lg">{project.name}</td>
                    <td className="px-6 py-2 text-lg">{project.owner}</td>
                    <td className="px-6 py-2 text-lg">1-7-2024</td>
                    <td className="px-6 py-2 ">
                      <div className='flex items-center gap-2 cursor-pointer'>
                        <svg onClick={() => { handlebutton(index) }} className='h-14 w-8' fill="#ADB0B2"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          version="1.1"
                          x="0px"
                          y="0px"
                          viewBox="0 0 100 100"
                          enableBackground="new 0 0 100 100"
                          xmlSpace="preserve"
                        >
                          <g display="none">
                            <polygon
                              display="inline"
                              points="76.2,46.8 36.2,46.8 56.2,26.8 51.6,22.2 23.8,50 51.6,77.8 56.2,73.2    36.2,53.2 76.2,53.2  "
                            />
                            <path
                              display="inline"
                              d="M50,21.4c-13,0-23.5,10.5-23.5,23.5C26.5,63.6,50,78.6,50,78.6s23.5-15,23.5-33.7   C73.5,31.9,63,21.4,50,21.4z M50,53.9c-5.2,0-9.4-4.2-9.4-9.4c0-5.2,4.2-9.4,9.4-9.4s9.4,4.2,9.4,9.4C59.4,49.6,55.2,53.9,50,53.9z   "
                            />
                            <path
                              display="inline"
                              d="M74.7,30.2H60.1L50,20.1c0,0-5.8,5.8-10.1,10.1H25.3c-2.7,0-4.8,2.2-4.8,4.8v40c0,2.7,2.2,4.8,4.8,4.8   h49.4c2.7,0,4.8-2.2,4.8-4.8V35C79.5,32.4,77.4,30.2,74.7,30.2z M50,39.5c2.6,0,5.8,2,5.8,7.4c0,4.4-2.1,8.5-5.8,8.5   s-5.8-4.1-5.8-8.5C44.2,41.5,47.4,39.5,50,39.5z M61.8,68H50c0,0-11.8,0-11.8,0v-1.8c0-1.8,0.8-8.1,10.1-8.1H50h1.7   c9.3,0,10.1,6.3,10.1,8.1V68z"
                            />
                            <path
                              display="inline"
                              d="M74.7,21H25.3c-2.7,0-4.8,2.2-4.8,4.8v48.3c0,2.7,2.2,4.8,4.8,4.8H50V56.7h-6.4v-9.6H50   v-6.5c0-5.3,4.3-9.6,9.6-9.6h10v9.6h-6.8c-1.7,0-3.1,1.4-3.1,3.1v3.4h10v9.6h-10V79h15.1c2.7,0,4.8-2.2,4.8-4.8V25.9   C79.5,23.2,77.4,21,74.7,21z"
                            />
                            <g display="inline">
                              <path d="M67.9,35.1C59.7,35.1,53,41.8,53,50s6.7,14.9,14.9,14.9S82.8,58.2,82.8,50S76.1,35.1,67.9,35.1z     M67.9,59.5c-5.2,0-9.5-4.3-9.5-9.5s4.3-9.5,9.5-9.5s9.5,4.3,9.5,9.5S73.1,59.5,67.9,59.5z" />
                              <path d="M32.1,35.1c-8.2,0-14.9,6.7-14.9,14.9s6.7,14.9,14.9,14.9S47,58.2,47,50S40.3,35.1,32.1,35.1z" />
                            </g>
                            <path
                              display="inline"
                              d="M69.7,67.8c-1.8,1.6-4.2,2.6-6.8,2.6c-2.6,0-4.9-0.9-6.7-2.5c-0.2-0.1-0.3-0.3-0.5-0.5   c-1.1-1.3-1.6-3-1.6-4.7V47.4h14.3V35.7H54.1V19.3H43.6l0,0c0,7.4-6,16.4-13.3,16.4h0v11.8h8.9l0,17.2c0,4.3,1.8,8.5,5,11.3   c3.4,3,7.8,4.7,12.7,4.7c4.9,0,9.4-1.8,12.8-4.8V67.8z"
                            />
                            <polygon
                              display="inline"
                              points="73.5,31.1 68.9,26.5 50,45.4 31.1,26.5 26.5,31.1 45.4,50 26.5,68.9 31.1,73.5    50,54.6 68.9,73.5 73.5,68.9 54.6,50  "
                            />
                            <path
                              display="inline"
                              d="M50,1.3C23.1,1.3,1.3,23.1,1.3,50c0,26.9,21.8,48.7,48.7,48.7S98.7,76.9,98.7,50   C98.7,23.1,76.9,1.3,50,1.3z M44.7,75H26.9c-1,0-1.8-0.8-1.8-1.8V55.3c0-1,0.8-1.8,1.8-1.8s1.8,0.8,1.8,1.8v15.9h15.9   c1,0,1.8,0.8,1.8,1.8S45.7,75,44.7,75z M75,44.7c0,1-0.8,1.8-1.8,1.8s-1.8-0.8-1.8-1.8V28.7H55.3c-1,0-1.8-0.8-1.8-1.8   c0-1,0.8-1.8,1.8-1.8h17.8c1,0,1.8,0.8,1.8,1.8V44.7z"
                            />
                            <g display="inline">
                              <path d="M50,1.3C23.1,1.3,1.3,23.1,1.3,50c0,26.9,21.8,48.7,48.7,48.7S98.7,76.9,98.7,50    C98.7,23.1,76.9,1.3,50,1.3z M71.5,58.5c0,7.1-5.8,12.9-12.9,12.9H41.5c-7.1,0-12.9-5.8-12.9-12.9V41.5c0-7.1,5.8-12.9,12.9-12.9    h17.1c7.1,0,12.9,5.8,12.9,12.9V58.5z" />
                              <path d="M32.2,41.5v17.1c0,5.1,4.1,9.2,9.2,9.2h6.7V32.2h-6.7C36.4,32.2,32.2,36.4,32.2,41.5z" />
                              <path d="M51.8,67.8h6.7c5.1,0,9.2-4.1,9.2-9.2v-6.7H51.8V67.8z" />
                              <path d="M58.5,32.2h-6.7v15.9h15.9v-6.7C67.8,36.4,63.6,32.2,58.5,32.2z" />
                            </g>
                            <g display="inline">
                              <path d="M36,42.1c-4.4,0-7.9,3.6-7.9,7.9c0,4.4,3.6,7.9,7.9,7.9c4.9,0,9.6-5,11.8-7.9C46,47.7,41.3,42.1,36,42.1z    " />
                              <path d="M64,42.1c-5.3,0-10,5.6-11.8,7.9c1.7,2.3,6.5,7.9,11.8,7.9c4.4,0,7.9-3.6,7.9-7.9    C71.9,45.6,68.4,42.1,64,42.1z" />
                              <path d="M50,1.3C23.1,1.3,1.3,23.1,1.3,50c0,26.9,21.8,48.7,48.7,48.7c26.9,0,48.7-21.8,48.7-48.7    C98.7,23.1,76.9,1.3,50,1.3z M64,61.6c-6.3,0-11.5-5.4-14-8.5c-2.5,3.1-7.7,8.5-14,8.5c-6.4,0-11.6-5.2-11.6-11.6    S29.6,38.4,36,38.4c6.3,0,11.5,5.4,14,8.5c2.5-3.1,7.7-8.5,14-8.5c6.4,0,11.6,5.2,11.6,11.6S70.4,61.6,64,61.6z" />
                            </g>
                            <g display="inline">
                              <path d="M43.8,74.9H25.1V56.2c0-1.2-1-2.2-2.2-2.2c-1.2,0-2.2,1-2.2,2.2V77c0,1.2,1,2.2,2.2,2.2h20.8    c1.2,0,2.2-1,2.2-2.2C45.9,75.8,44.9,74.9,43.8,74.9z" />
                              <path d="M77,20.8H56.2c-1.2,0-2.2,1-2.2,2.2s1,2.2,2.2,2.2h18.6v18.6c0,1.2,1,2.2,2.2,2.2c1.2,0,2.2-1,2.2-2.2V23    C79.2,21.8,78.2,20.8,77,20.8z" />
                            </g>
                            <path
                              display="inline"
                              d="M60,24.9H40c-8.3,0-15.1,6.8-15.1,15.1v20c0,8.3,6.8,15.1,15.1,15.1h20   c8.3,0,15.1-6.8,15.1-15.1V40C75.1,31.7,68.3,24.9,60,24.9z M70.8,40v7.8H52.2V29.2H60C65.9,29.2,70.8,34.1,70.8,40z M29.2,60V40   c0-6,4.8-10.8,10.8-10.8h7.8v41.6H40C34.1,70.8,29.2,65.9,29.2,60z M60,70.8h-7.8V52.2h18.6V60C70.8,65.9,65.9,70.8,60,70.8z"
                            />
                            <path
                              display="inline"
                              d="M66.4,36.4c-7.4,0-13.5,6.3-16.4,9.9c-2.9-3.6-9-9.9-16.4-9.9c-7.5,0-13.6,6.1-13.6,13.6   s6.1,13.6,13.6,13.6c7.4,0,13.5-6.3,16.4-9.9c2.9,3.6,9,9.9,16.4,9.9c7.5,0,13.6-6.1,13.6-13.6S73.9,36.4,66.4,36.4z M33.6,59.3   c-5.1,0-9.3-4.2-9.3-9.3s4.2-9.3,9.3-9.3c6.2,0,11.7,6.6,13.7,9.3C44.9,53.4,39.3,59.3,33.6,59.3z M66.4,59.3   c-6.2,0-11.7-6.5-13.7-9.3c2-2.7,7.5-9.3,13.7-9.3c5.1,0,9.3,4.2,9.3,9.3S71.5,59.3,66.4,59.3z"
                            />
                            <g display="inline">
                              <path d="M50,4.7C25,4.7,4.7,25,4.7,50S25,95.3,50,95.3S95.3,75,95.3,50S75,4.7,50,4.7z M50,89.9    C28,89.9,10.1,72,10.1,50S28,10.1,50,10.1S89.9,28,89.9,50S72,89.9,50,89.9z" />
                              <path d="M67.6,52.3L49.7,41.5h0l3.6-23.9c0.2-1.4-1.7-2.1-2.4-0.9L32,45.9c-0.4,0.6-0.2,1.5,0.4,1.9l17.8,10.8h0    l-3.6,23.9c-0.2,1.4,1.7,2.1,2.4,0.9L68,54.1C68.4,53.5,68.2,52.6,67.6,52.3z" />
                            </g>
                            <g display="inline">
                              <circle cx={50} cy="27.7" r="6.4" />
                              <circle cx={50} cy={50} r="6.4" />
                              <circle cx={50} cy="72.3" r="6.4" />
                            </g>
                            <g display="inline">
                              <path d="M33.2,45.9c-1.1-1.1-2.8-1.1-3.8,0l-8.8,8.8c-0.2-1.5-0.4-3-0.4-4.6c0-16.4,13.3-29.7,29.7-29.7    c4.7,0,9.2,1.1,13.4,3.2c1.3,0.7,3,0.1,3.6-1.2c0.7-1.3,0.1-3-1.2-3.6C60.8,16.3,55.5,15,49.9,15c-19.3,0-35.1,15.7-35.1,35.1    c0,1.8,0.1,3.6,0.4,5.4l-9.6-9.6c-1.1-1.1-2.8-1.1-3.8,0c-1.1,1.1-1.1,2.8,0,3.8l13.8,13.8c0.5,0.5,1.2,0.8,1.9,0.8    s1.4-0.3,1.9-0.8l13.8-13.8C34.2,48.6,34.2,46.9,33.2,45.9z" />
                              <path d="M98.1,50.3L84.4,36.5c-1.1-1.1-2.8-1.1-3.8,0L66.8,50.3c-1.1,1.1-1.1,2.8,0,3.8c1.1,1.1,2.8,1.1,3.8,0    l8.8-8.8c0.2,1.5,0.4,3,0.4,4.6c0,16.4-13.3,29.7-29.7,29.7c-4.7,0-9.2-1.1-13.4-3.2c-1.3-0.7-3-0.1-3.6,1.2    c-0.7,1.3-0.1,3,1.2,3.6c4.9,2.5,10.3,3.8,15.9,3.8c19.3,0,35.1-15.7,35.1-35.1c0-1.8-0.1-3.6-0.4-5.4l9.6,9.6    c0.5,0.5,1.2,0.8,1.9,0.8s1.4-0.3,1.9-0.8C99.2,53.1,99.2,51.4,98.1,50.3z" />
                            </g>
                            <g display="inline">
                              <rect x="67.7" y="45.3" width="9.5" height="9.5" />
                              <rect x="45.3" y="45.3" width="9.5" height="9.5" />
                              <rect x="22.9" y="45.3" width="9.5" height="9.5" />
                              <rect x="67.7" y="67.7" width="9.5" height="9.5" />
                              <rect x="45.3" y="67.7" width="9.5" height="9.5" />
                              <rect x="22.9" y="67.7" width="9.5" height="9.5" />
                              <rect x="67.7" y="22.9" width="9.5" height="9.5" />
                              <rect x="45.3" y="22.9" width="9.5" height="9.5" />
                              <rect x="22.9" y="22.9" width="9.5" height="9.5" />
                            </g>
                            <g display="inline">
                              <rect x="18.7" y="21.2" width="7.9" height="7.9" />
                              <rect x="18.7" y="46.1" width="7.9" height="7.9" />
                              <rect x="18.7" y={71} width="7.9" height="7.9" />
                              <rect x="33.1" y="23.6" width="48.2" height="2.9" />
                              <rect x="33.1" y="48.6" width="48.2" height="2.9" />
                              <rect x="33.1" y="73.5" width="48.2" height="2.9" />
                            </g>
                            <g display="inline">
                              <path d="M59.1,58.5H40.9c-2.9,0-5.3,2.4-5.3,5.4v4.2h3.2v-4.2c0-1.2,0.9-2.1,2-2.1h18.2c1.1,0,2,1,2,2.1v4.2h3.2    v-4.2C64.4,60.9,62,58.5,59.1,58.5z" />
                              <path d="M50,55c4.6,0,8.4-3.8,8.4-8.4s-3.8-8.4-8.4-8.4s-8.4,3.8-8.4,8.4S45.4,55,50,55z M50,41.5    c2.8,0,5.1,2.3,5.1,5.1c0,2.8-2.3,5.1-5.1,5.1s-5.1-2.3-5.1-5.1C44.9,43.8,47.2,41.5,50,41.5z" />
                              <path d="M79.5,24.3h-18c-0.8,0-1.6-0.3-2.1-0.9l-6.2-6.2c-0.8-0.8-2-1.3-3.1-1.3s-2.3,0.5-3.1,1.3l-6.2,6.2    c-0.6,0.6-1.3,0.9-2.1,0.9h-18c-4,0-7.3,3.3-7.3,7.3v45.4c0,4,3.3,7.3,7.3,7.3h59c4,0,7.3-3.3,7.3-7.3V31.5    C86.8,27.5,83.5,24.3,79.5,24.3z M83.5,76.9c0,2.2-1.8,4-4,4h-59c-2.2,0-4-1.8-4-4V31.5c0-2.2,1.8-4,4-4h18c1.7,0,3.3-0.7,4.4-1.8    l6.2-6.2c0.5-0.5,1.3-0.5,1.7,0l6.2,6.2c1.2,1.2,2.8,1.8,4.4,1.8h18c2.2,0,4,1.8,4,4V76.9z" />
                            </g>
                          </g>
                          <g>
                            <g>
                              <polygon points="79.7,43.5 79.7,32.8 73.2,32.8 73.2,43.5 62.5,43.5 62.5,50 73.2,50 73.2,60.7 79.7,60.7 79.7,50     90.4,50 90.4,43.5   " />
                              <circle cx="42.4" cy="35.2" r="15.9" />
                              <path d="M59.4,58.2H24.9c-8.5,0-15.4,6.9-15.4,15.4v3.9c0,1.8,1.5,3.3,3.3,3.3h58.6c1.8,0,3.3-1.5,3.3-3.3v-3.9    C74.8,65.1,67.9,58.2,59.4,58.2z" />
                            </g>
                          </g>
                        </svg>
                        <svg className="h-5 w-5 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" fill="#ADB0B2" /></svg>
                        <svg onClick={() => {
                          handleProjectDelete(index);
                        }} className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z " fill="#ADB0B2" /></svg>
                      </div>
                    </td>
                  </tr>
                )
              })}

            </tbody>
          </table>
        </div>

      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75">
          <div className="bg-gray-800 p-5 rounded-lg">
            <form onSubmit={handleFormSubmit}>
              <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-300">
                Username
              </label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setuserName(e.target.value)}
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
    </>
  )
}

export default page
