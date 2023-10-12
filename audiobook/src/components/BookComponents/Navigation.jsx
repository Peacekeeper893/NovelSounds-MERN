import React, { Fragment , useState } from "react";
import ChapterList from "./ChapterList";
import AboutBook from "./AboutBook";

const Navigation = ({sendData , book , chapter_number}) => {

    const [open, setOpen] = useState("chapters")
    const handleChapterClick = () => {
        setOpen((prev) => "chapters")
    }

    const handleAboutClick = () => {
        setOpen((prev) => "book")
    }



    return (
        <Fragment>

            <div className="flex justify-evenly dark:bg-d-bg-200 dark:text-white">
                {open === "chapters" && <div className="p-4 rounded-lg font-semibold font-serif underline underline-offset-4" onClick={handleChapterClick}>CHAPTERS</div>}
                {open !== "chapters" && <div className="p-4 rounded-lg font-semibold font-serif cursor-pointer" onClick={handleChapterClick}>CHAPTERS</div>}

                {open === "book" && <div className=" p-4 rounded-lg font-semibold font-serif underline underline-offset-4" onClick={handleAboutClick}>ABOUT</div>}
                {open !== "book" && <div className=" p-4 rounded-lg font-semibold font-serif  cursor-pointer" onClick={handleAboutClick}>ABOUT</div>}


                
            </div>


            {open === "chapters" && <ChapterList sendData={sendData} chapters={book[0]["chapters"]} chapter_number={chapter_number} chapterdetails={ book[0]["chapterdetails"]} />}
            {open === "book" && <AboutBook about={book[0]["about"] } />}
        </Fragment>
    );
};

export default Navigation;
