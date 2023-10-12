import React, { Fragment, useEffect, useState } from "react";
import UseAnimations from "react-useanimations";

import Activity from "react-useanimations/lib/activity";

import { BsFillPlayCircleFill } from "react-icons/bs";

const ChapterItem = ({
    num,
    title,
    description,
    sendData,
    chapter_number,
    chapterdetails,
}) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const onClickHandler = () => {
        sendData(num);
        setIsPlaying(true);
    };

    useEffect(() => {
        if (chapter_number !== num) setIsPlaying(false);
        else setIsPlaying(true);
    }, [chapter_number]);

    return (
        <Fragment>
            <div className="p-3 pl-6 bg-neutral-100 m-3 dark:bg-d-bg-300 dark:text-white">
                <div className="flex gap-3 align-top">
                    <button onClick={onClickHandler}>
                        {isPlaying === false ? (
                            <BsFillPlayCircleFill className="mt-1" />
                        ) : (
                            <UseAnimations animation={Activity} size={26} color="white" />
                        )}
                    </button>
                    {chapterdetails && <span className="font-bold">{num}. </span>}{" "}
                    {chapterdetails && (
                        <span className="font-semibold">{title}</span>
                    )}
                    {!chapterdetails && (
                        <span className="font-semibold">Chapter {num}</span>
                    )}
                </div>
                {chapterdetails && <div className="dark:text-d-bg-600">{description}</div>}
            </div>
        </Fragment>
    );
};

export default ChapterItem;
