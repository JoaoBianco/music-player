import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import MusicPlayer from "@/components/MusicPlayer";

const App = () => {
  const [duracaoMusicaFormatada, setDuracaoMusicaFormatada] = useState("00:00");

  return (
    <div className="flex h-screen transition-all duration-300 dark:bg-gray-800">
      <NavBar duracaoMusicaFormatada={duracaoMusicaFormatada} />
      <MusicPlayer
        duracaoMusicaFormatada={duracaoMusicaFormatada}
        setDuracaoMusicaFormatada={setDuracaoMusicaFormatada}
      />
    </div>
  );
};

export default App;
