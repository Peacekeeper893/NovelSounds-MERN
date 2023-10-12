import React, { Fragment, useState } from "react";
import { MdExpandMore } from "react-icons/md";
import NovelSounds from "./NovelSounds";
import BrowseModal from "./BrowseModal";
import { Link } from "react-router-dom";
import Switcher from "./Switcher";

const Navbar = () => {

    const [browse, setBrowse] = useState(false);

    const handleFocus = () => {
        console.log(browse)
        setBrowse((prev) => (!prev))
        
    }
    return (
        <Fragment>

            
            <div className="  h-[12vh] flex justify-between md:px-7 dark:bg-d-bg-100 dark:text-white px-4">
                <div className="self-center md:text-4xl"><NovelSounds/></div>
                <div className="self-center "><Switcher/></div>
            </div>

            <div className="bg-slate-900 w-full text-white flex justify-start gap-6 py-2 dark:bg-d-bg-400" >
                <div className="ml-12 flex " >
                    <span className="hover:underline"><Link to={"/"}>Home</Link></span>
                </div>
                <div className=" flex "  onClick={handleFocus} >
                    <span className="hover:text-blue-400  ">Browse</span>

                    {browse && <BrowseModal/>}
                    <span className="p-1">
                        <MdExpandMore />
                    </span>
                </div>
                

            </div>
            
        </Fragment>
    );
};

export default Navbar;
