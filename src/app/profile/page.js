'use client'
import React from 'react'
import { useSession } from 'next-auth/react'

const page = () => {
  const { data: session } = useSession();
  return (
    <div className='text-white'>
      Project List will be shown here
    </div>
  )
}

export default page
