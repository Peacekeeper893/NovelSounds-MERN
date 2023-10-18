import React from 'react'

const AboutBook = ({about}) => {
  return (
    <div className=' md:px-12 md:py-12 min-h-[40vh] dark:bg-d-bg-200 dark:text-white text-justify px-6 py-6'>
      {about}
    </div>
  )
}

export default AboutBook