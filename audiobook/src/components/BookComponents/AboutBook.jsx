import React from 'react'

const AboutBook = ({about}) => {
  return (
    <div className=' px-12 py-12 min-h-[40vh] dark:bg-d-bg-200 dark:text-white text-justify'>
      {about}
    </div>
  )
}

export default AboutBook