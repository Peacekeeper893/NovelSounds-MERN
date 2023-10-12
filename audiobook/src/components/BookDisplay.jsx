import React from 'react'

const BookDisplay = ({name , author , bookimg}) => {
  return (
    <div className='md:h-[533px] md:w-[250px] w-[140px] h-[315px] my-3 '>
      <div className="h-[75%] mb-2">
        <img src={bookimg} alt="img" className='object-fit h-[240px] w-[140px] md:h-[400px] md:w-[250px]' />
      </div>
      <div className="h-[25%] ">
        <p className='md:text-xl text-md mb-2 font-semibold hover:text-cyan-400 dark:hover:text-d-primary-500'>{name}</p>
        <p className='text-sm dark:text-d-bg-600'>{author}</p>
      </div>
    </div>
  )
}

export default BookDisplay