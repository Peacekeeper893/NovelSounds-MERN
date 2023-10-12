import React from "react";

import ChapterItem from "./ChapterItem";

const ChapterList = ({ sendData , chapters , chapter_number ,chapterdetails}) => {
    return (
        <div className="dark:bg-d-bg-200 pt-4">
            {chapters.map((chapter) => (
                <ChapterItem
                    num={chapter.chapter_number}
                    title={chapter.chapter_title}
                    description={chapter.description}
                    sendData={sendData}
                    chapter_number={chapter_number}
                    chapterdetails ={chapterdetails}
                />
            ))}
        </div>
    );
};

export default ChapterList;
