

import React from 'react';
import { motion } from 'framer-motion';

const BookDisplay = ({ name, author, bookimg }) => {

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      onTap={{ scale: 0.95 }}
      className='lg:h-[533px] lg:w-[250px] w-[140px] h-[315px] md:h[425] md:w-[200] my-3'
    >
      <div className="h-[75%] mb-2">
        <img src={bookimg} alt="img" className='object-fit h-[240px] w-[140px] lg:h-[400px] lg:w-[250px] md:h[375] md:w-[200]' />
      </div>
      <div className="h-[25%] ">
        <p className='lg:text-xl md:text-lg text-md mb-2 font-semibold hover:text-cyan-400 dark:hover:text-d-primary-500'>{name}</p>
        <p className='text-sm dark:text-d-bg-600'>{author}</p>
      </div>
    </motion.div>
  )
}

export default BookDisplay;