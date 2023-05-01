import React, { useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col gap-4">
        <img
          className="rounded-full w-42 h-42"
          src="/images/aesthetics.jpg"
          alt=""
        />
        <div className="flex flex-col gap-4 text-teal-400 font-semibold">
          <p>Song Name</p>
          <div>size</div>
          <div>
            <button>
              <SkipPreviousIcon />
            </button>
            <button onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </button>
            <button>
              <SkipNextIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
