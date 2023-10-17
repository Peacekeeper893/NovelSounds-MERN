import React, { Fragment, useRef, useState } from "react";
import DisplayTrack from "./DisplayTrack";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";

const Audioplayer = ({ currentTrack ,openModalHandler ,sendData ,chapter_number,book,openModal }) => {
    const audioRef = useRef();
    const progressBarRef = useRef();

    const [timeProgress, setTimeProgress] = useState(0);
    const [duration, setDuration] = useState(0);


    return (
        <Fragment>
            <DisplayTrack
                currentTrack={currentTrack}
                audioRef={audioRef}
                setDuration={setDuration}
                progressBarRef={progressBarRef}
                book={book}
                chapter_number = {chapter_number}
            />
            <Controls
                {...{
                    audioRef,
                    progressBarRef,
                    duration,
                    setTimeProgress,
                    openModalHandler,
                    sendData,
                    chapter_number,
                    book,
                    openModal
                }}
            />
            <ProgressBar
                progressBarRef={progressBarRef}
                audioRef={audioRef}
                timeProgress={timeProgress}
                duration={duration}
            />

        </Fragment>
    );
};

export default Audioplayer;
