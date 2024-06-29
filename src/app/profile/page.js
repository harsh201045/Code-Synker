'use client'
import React from 'react'
import { useSession } from 'next-auth/react'

const page = () => {
  const { data: session } = useSession();
  return (
    <>
      {
        session ?
          <div className='text-white'>
            {session.user.username}
          </div > : ""
      }
    </>
  )
}

export default page
