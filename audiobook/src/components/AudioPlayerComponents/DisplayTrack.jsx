import React from "react";

const DisplayTrack = ({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
}) => {
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };


  const onLoadedData = () => {
    audioRef.current.play();
  }

  return (
    <div className="">
      <audio
        className="w-full"
        // preload="auto"
        id="audio-el"
        type = "audio/mpeg"
        src={currentTrack}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onLoadedData={onLoadedData}
      ></audio>
    </div>
  );
};

export default DisplayTrack;
