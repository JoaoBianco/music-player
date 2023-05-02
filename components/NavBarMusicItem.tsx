import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MusicaId, MudarMusicaId, MenuExpandido } from "@/pages/_app";

type NavBarMusicItemProps = {
  music: {
    id: number;
    nome: string;
    url: string;
    image: string;
  };
};

const NavBarMusicItem: React.FC<NavBarMusicItemProps> = ({ music }) => {
  const musicaId = useContext(MusicaId);
  const mudarMusicaId = useContext(MudarMusicaId);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [duracaoFormatada, setDuracaoFormatada] = useState("00:00");
  const menuExpandido = useContext(MenuExpandido);

  function segundosParaMinESegundos(segundos: number = 0) {
    segundos = Math.floor(segundos);
    if (segundos < 60) {
      setDuracaoFormatada(`00:${segundos < 10 ? "0" + segundos : segundos}`);
    }
    let minutes: number | string = Math.floor(segundos / 60);
    let extraSeconds: number | string = segundos % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;
    setDuracaoFormatada(`${minutes}:${extraSeconds}`);
  }

  useEffect(() => {
    setTimeout(() => {
      segundosParaMinESegundos(audioRef.current?.duration);
    }, 1000);
    console.clear();
  }, []);

  return (
    <motion.div
      initial={{ x: "-500" }}
      animate={{ x: 0 }}
      exit={{ x: "-500" }}
      transition={{ delay: 0.1 }}
      className={`flex ${
        menuExpandido ? "" : "flex-col"
      } cursor-pointer p-2 items-center gap-2 hover:outline-1 hover:-outline-offset-2 hover:outline-white hover:outline hover:rounded-md ${
        music.id === musicaId ? "border-2 border-white rounded-md" : ""
      }`}
      onClick={() => mudarMusicaId(music.id)}
    >
      <img className="w-10 h-10 rounded-full" src={music.image} />
      <div>
        <p className="overflow-x-auto">{music.nome}</p>
        <audio src={music.url} ref={audioRef} autoPlay={false}></audio>
        <span className="text-sm text-gray-100 opacity-70">
          {duracaoFormatada}
        </span>
      </div>
    </motion.div>
  );
};

export default NavBarMusicItem;
