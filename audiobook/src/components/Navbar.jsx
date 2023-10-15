import React, { Fragment, useState } from "react";
import { MdExpandMore } from "react-icons/md";
import NovelSounds from "./NovelSounds";
import BrowseModal from "./BrowseModal";
import { Link } from "react-router-dom";
import Switcher from "./Switcher";
import Login from "./Login";

import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

import { IoLogOutOutline, IoLogOutSharp } from "react-icons/io5";

const Navbar = ({ loggedIn }) => {
    const [browse, setBrowse] = useState(false);

    const navigate = useNavigate();
    const auth = getAuth();
    const user = auth.currentUser;

    let displayName = "User"

    if (user !== null) {
        displayName = user.displayName;
    }
    
    // console.log(displayName)

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                // Sign-out successful.
                navigate("/");
                console.log("Signed out successfully");
            })
            .catch((error) => {
                // An error happened.
            });
    };

    const handleFocus = () => {
        console.log(browse);
        setBrowse((prev) => !prev);
    };
    return (
        <Fragment>
            <div className="  h-[12vh] flex justify-between md:px-7 dark:bg-d-bg-100 dark:text-white pl-2 pr-1">
                <div className="self-center md:text-4xl">
                    <NovelSounds />
                </div>

                <div className="flex md:gap-8 gap-3">
                    <div className="self-center ">
                        <Switcher />
                    </div>
                    {!loggedIn && (
                        <div className="self-center text-md md:text-lg">
                            <Link to={"/login"}>Login / SignUp</Link>
                        </div>
                    )}
                    {loggedIn && (
                        <div className="self-center text-4xl hover:cursor-pointer">
                            <IoLogOutOutline onClick={handleLogout} />
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-slate-900 w-full text-white flex justify-between gap-6 py-2 dark:bg-d-bg-400">


                <div className="ml-12 flex justify-start gap-4">
                    <span className="hover:underline">
                        <Link to={"/"}>Home</Link>
                    </span>

                    <div className=" flex " onClick={handleFocus}>
                        <span className="hover:text-blue-400  ">Browse</span>

                        {browse && <BrowseModal />}
                        <span className="p-1">
                            <MdExpandMore />
                        </span>
                    </div>
                </div>

                <div>
                    {loggedIn && <p className="px-4 font-eczar md:text-lg">Hi {displayName}</p>}
                </div>
            </div>
        </Fragment>
    );
};

export default Navbar;
