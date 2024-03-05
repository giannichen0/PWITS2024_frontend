import React from 'react'

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen" >
        <div className="animate-ping w-16 h-16 rounded-full bg-purple-600"></div>
    </div>
    
  )
}

export default Spinner