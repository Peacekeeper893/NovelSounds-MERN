import React, { Fragment } from "react";

const Hero = ({book}) => {
    return (
        <Fragment>
            <div className="md:p-8 flex justify-start md:gap-9 dark:bg-d-bg-200 dark:text-white gap-4 p-4">
                <div className="md:h-[320px] md:w-[250px] md:min-w-[250px]  h-[190px] w-[190px]">
                    <img
                        src={book[0]["bookimg"]}
                        alt=""
                        className="w-full h-full object-fill"
                    />
                </div>

                <div>
                    <h1 className="md:text-4xl text-xl mb-2">{book[0]["name"]}</h1>
                    <p className="md:text-xl text-lg">{book[0]["author"]}</p>


                    <p className="mt-16 italic font-extralight max-w-[100%] max-h-[4.9em] overflow-hidden md:block hidden">{book[0]["about"] }</p>
                </div>
            </div>
        </Fragment>
    );
};

export default Hero;
