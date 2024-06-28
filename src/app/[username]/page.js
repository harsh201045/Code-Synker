import React from 'react'

const page = ({params}) => {
  return (
    <div className='text-white'>
      {params.username}
    </div>
  )
}

export default page
