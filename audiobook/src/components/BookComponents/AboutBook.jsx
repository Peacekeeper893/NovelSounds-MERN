import React, { Fragment } from 'react'
import { useState, useEffect, useRef } from 'react';
import ePub from 'epubjs';

import hp3test from '../../data/hp3test.epub'

const AboutBook = ({ about, bookName }) => {
  


  

  return (

    <Fragment>
    <div className=' md:px-12 md:py-12 min-h-[40vh] dark:bg-d-bg-200 dark:text-white text-justify px-6 py-6'>
      {about}
    </div>


      </Fragment>
  )
}

// fetch details of book from google books api


export default AboutBook