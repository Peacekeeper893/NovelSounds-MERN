import React, { Fragment } from "react";
import { motion } from "framer-motion";
import { slideIn } from "../motion";
import { SectionWrapper } from "../hoc";

const Modal = ({ openModalHandler, closeModalHandler, book }) => {
    const containerStyle = {
        backgroundImage: `url(${book[0]["bookimg"]})`,
        opacity: 0.9, // Increase the opacity to make the background darker
        filter: "contrast(1.2) saturate(90%) brightness(25%)", // Decrease the brightness and adjust the contrast to make the text more visible
      };
    const mainstyle = {
        opacity: 1,
        filter: "contrast(1.0) saturate(100%) brightness(100%)",
    };

    const variants = {
        hidden: { x: '-100%' }, // Offscreen to the left
        visible: { x: 0 },      // Slide in from the left to the center
      };
    
      // Define the transition settings
      const transition = {
        type: 'spring',
        damping: 20,
        stiffness: 100,
      };
    // console.log(backdrop)
    return (
        <Fragment>
            <div
                className={`max-w-full bg-black h-screen  w-full -z-40 text-white absolute top-0 bg-cover  bg-center shadow-slate-950 shadow-2xl bg-no-repeat `}
                style={containerStyle}
            >
                <button
                    className="text-white float-right p-4 font-bold font-serif"
                    onClick={closeModalHandler}
                >
                    X
                </button>
            </div>



            <motion.div

                initial="hidden"
                animate="visible"
                variants={variants}
                transition={transition}
                
                className="block lg:h-[60%] md:bottom-[40vh] md:w-[40%] md:left-[30%] absolute lg:bottom-20 h-[50%] bottom-[30vh] left-[20%] right-[20%] w-[60%] lg:w-[20%] lg:left-[4%]"
            >
                <img
                    src={book[0]["bookimg"]}
                    className="h-[100%] bottom-12 md:bottom-3  absolute left-[3%]  w-[110%]  md:left-[4%]"
                    
                    style={mainstyle}
                />

            </motion.div>
        </Fragment>
    );
};

export default Modal;
