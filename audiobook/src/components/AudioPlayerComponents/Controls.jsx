import { useState, useEffect, useCallback, useRef } from "react";

// icons
import {
    IoPlaySkipBackSharp,
    IoPlaySkipForwardSharp,
    IoPlaySharp,
    IoPauseSharp,
} from "react-icons/io5";

import { IoMdVolumeHigh, IoMdVolumeOff, IoMdVolumeLow } from "react-icons/io";
import { BsArrowsFullscreen, BsGearFill } from "react-icons/bs";
import UseAnimations from "react-useanimations";

import maximizeMinimize from "react-useanimations/lib/maximizeMinimize";

import { GrForwardTen, GrBackTen } from "react-icons/gr";

const Controls = ({
    audioRef,
    progressBarRef,
    duration,
    setTimeProgress,
    openModalHandler,
    sendData,
    chapter_number,
    book,
    openModal,
}) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const [volumeval, setVolume] = useState(60);
    const [errorOccurred, setErrorOccurred] = useState(false);
    const [muteVolume, setMuteVolume] = useState(false);

    const playAnimationRef = useRef();

    const imgurl = book[0]["bookimg"];

    useEffect(() => {
        if (audioRef) {
            audioRef.current.volume = volumeval / 100;
            audioRef.current.muted = muteVolume;
        }
    }, [volumeval, audioRef, muteVolume]);

    useEffect(() => {
        const audioElement = audioRef.current;

        const handleError = () => {
            setErrorOccurred(true);
            console.log("Wazzawi");
            const cpy = audioRef.current.currentTime;
            audioRef.current.load();
            audioRef.current.currentTime = cpy;
        };

        const handleStalled = () => {
            console.log(
                "Audio playback stalled. Check your network connection or the audio file."
            );
        };

        const handlePaused = () => {
            setIsPlaying((prev) => false);
        };
        const handlePlay = () => {
            setIsPlaying((prev) => true);
        };

        // Add event listeners to the audio element
        audioElement.addEventListener("error", handleError);
        audioElement.addEventListener("stalled", handleStalled);
        audioElement.addEventListener("pause", handlePaused);
        audioElement.addEventListener("play", handlePlay);
        audioElement.addEventListener("ended", handleEnded);

        // Remove event listeners when the component unmounts
        return () => {
            audioElement.removeEventListener("error", handleError);
            audioElement.removeEventListener("stalled", handleStalled);
            audioElement.removeEventListener("pause", handlePaused);
            audioElement.removeEventListener("play", handlePlay);
            audioElement.removeEventListener("ended", handleEnded);
        };
    }, []);

    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };

    const repeat = useCallback(() => {
        let currentTime;

        try {
            currentTime = audioRef.current.currentTime;
            setTimeProgress(currentTime);
            progressBarRef.current.value = currentTime;
            progressBarRef.current.style.setProperty(
                "--range-progress",
                `${(progressBarRef.current.value / duration) * 100}%`
            );

            playAnimationRef.current = requestAnimationFrame(repeat);
        } catch (error) {
            console.log("Error");
        }
    }, [audioRef, duration, progressBarRef, setTimeProgress]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play().catch(() => {
                console.log("Wazza");
                const cpy = audioRef.current.currentTime;
                audioRef.current.load();
                audioRef.current.currentTime = cpy;
                // progressBarRef.current.value = currentTime;
            });
        } else {
            audioRef.current.pause();
        }
        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [isPlaying, audioRef, repeat]);

    const handleback10 = () => {
        audioRef.current.currentTime -= 10;
    };
    const handleforward10 = () => {
        audioRef.current.currentTime += 10;
    };

    const handlenext = () => {
        sendData(chapter_number + 1);
    };
    const handleprev = () => {
        sendData(chapter_number - 1);
    };

    const handleEnded = () => {
        // setTimeout(handlenext, 1000);
    };

    navigator.mediaSession.setActionHandler("previoustrack", function () {
        handleprev();
    });

    navigator.mediaSession.setActionHandler("nexttrack", function () {
        handlenext();
    });



    return (
        <div className="controls-wrapper">
            <div className={`controls md:flex justify-between px-6 ${openModal && "text-3xl"}`}>
                <div className="md:flex-[15%] hidden md:flex  self-center">

                    <select
                        className={`bg-transparent text-black  block ${openModal ? "md:hidden" : "md:block"} dark:placeholder-opacity-50 dark:ring-1 dark:ring-black ring-1 ring-gray-800 font-semibold font-sans rounded-lg pl-2  w-[42%] md:ml-8`}
                        onChange={(e) => {
                            audioRef.current.playbackRate = e.target.value;
                        }}

                        defaultValue={1}
                    >
                        <option value="0.25">0.25x</option>
                        <option value="0.5">0.5x</option>
                        <option value="0.75">0.75x</option>
                        <option value="1" >1x</option>
                        <option value="1.25">1.25x</option>
                        <option value="1.5">1.5x</option>
                        <option value="1.75">1.75x</option>
                        <option value="2">2x</option>
                        </select>
   
                </div>

                <div className="md:flex-[70%] self-center text-center pl-2">
                    <button className="px-2" onClick={handleprev}>
                        <IoPlaySkipBackSharp />
                    </button>
                    <button className="px-2" onClick={handleback10}>
                        <GrBackTen />
                    </button>

                    <button onClick={togglePlayPause} className="px-2">
                        {isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
                    </button>
                    <button className="px-2 " onClick={handleforward10}>
                        <GrForwardTen />
                    </button>
                    <button className="px-2" onClick={handlenext}>
                        <IoPlaySkipForwardSharp />
                    </button>
                </div>

                <div className="volume flex-[15%] flex gap-2  flex-nowrap float-right">
                    <button
                        onClick={() => setMuteVolume((prev) => !prev)}
                        className="hidden md:block"
                    >
                        {muteVolume || volumeval < 5 ? (
                            <IoMdVolumeOff />
                        ) : volumeval < 40 ? (
                            <IoMdVolumeLow />
                        ) : (
                            <IoMdVolumeHigh />
                        )}
                    </button>

                    <div className={`pb-2 self-center hidden md:block ${openModal &&"pb-[18px]"}`}>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            id="vol-control"
                            value={volumeval}
                            onChange={(e) => setVolume(e.target.value)}
                            style={{
                                background: `linear-gradient(to right, #f50 ${volumeval}%, #ccc ${volumeval}%)`,
                                paddingBottom: "6px",
                            }}
                        />
                    </div>

                    <div className="md:self-center pl-3 absolute left-0 bottom-[56px] md:hidden ">
                    <select
                        className={`bg-transparent text-black text-md block ${openModal ? "md:hidden" : "md:block"}   font-sans rounded-lg  py-1 w-[80%] bottom-5  ${openModal ? "text-xl " : "text-sm"}   `}
                        onChange={(e) => {
                            audioRef.current.playbackRate = e.target.value;
                        }}

                        defaultValue={1}
                    >
                        <option value="0.25">0.25x</option>
                        <option value="0.5">0.5x</option>
                        <option value="0.75">0.75x</option>
                        <option value="1" >1x</option>
                        <option value="1.25">1.25x</option>
                        <option value="1.5">1.5x</option>
                        <option value="1.75">1.75x</option>
                        <option value="2">2x</option>
                    </select>
                    </div>
                    <div className="md:self-center pl-4 left-0">
                        <BsArrowsFullscreen
                            onClick={openModalHandler}
                            className={`${openModal ? "text-2xl" : ""}`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Controls;
