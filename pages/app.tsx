import React from "react";
import NavBar from "@/components/NavBar";
import MusicPlayer from "@/components/MusicPlayer";

const App = () => {
  return (
    <div className="flex h-screen  transition-all duration-300 dark:bg-gray-800">
      <NavBar />
      <MusicPlayer />
    </div>
  );
};

export default App;
