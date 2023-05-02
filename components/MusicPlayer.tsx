import React, { useContext, useEffect, useRef, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { musics } from "@/data/musics";
import { MudarMusicaId, MusicaId } from "@/pages/_app";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import Head from "next/head";

type MusicPlayerProps = {
  duracaoMusicaFormatada: string;
  setDuracaoMusicaFormatada: React.Dispatch<React.SetStateAction<string>>;
};

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  duracaoMusicaFormatada,
  setDuracaoMusicaFormatada,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duracaoMusica, setDuracaoMusica] = useState(0);
  const [duracaoTotal, setDuracaoTotal] = useState<string | undefined>("00:00");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(0.5);

  const musicaId = useContext(MusicaId);
  const mudarMusicaId = useContext(MudarMusicaId);

  function tocarMusica() {
    setIsPlaying(true);
    audioRef.current?.play();
  }

  function pausarMusica() {
    setIsPlaying(false);
    audioRef.current?.pause();
  }

  function mudarVolume(e: React.ChangeEvent<HTMLInputElement>) {
    setVolume(parseFloat(e.target.value));
    audioRef.current!.volume = parseFloat(e.target.value);
  }

  function mudarDuracaoMusica(e: React.ChangeEvent<HTMLInputElement>) {
    setDuracaoMusica(parseFloat(e.target.value));
    segundosParaMinESegundos(parseFloat(e.target.value), true);
    audioRef.current!.currentTime = parseFloat(e.target.value);
  }

  function proximaMusica() {
    if (musicaId === musics.length - 1) {
      mudarMusicaId(0);
    } else {
      mudarMusicaId(musicaId + 1);
    }
    setTimeout(() => {
      audioRef.current?.play();
      setIsPlaying(true);
    }, 200);
  }

  function musicaAnterior() {
    if (musicaId === 0) {
      mudarMusicaId(musics.length - 1);
    } else {
      mudarMusicaId(musicaId - 1);
    }
    setTimeout(() => {
      audioRef.current?.play();
      setIsPlaying(true);
    }, 200);
  }

  function handleVolumeIcon() {
    if (volume === 0) {
      return (
        <VolumeOffIcon
          className="text-teal-500 cursor-pointer"
          onClick={() => {
            setVolume(0.5);
            audioRef.current!.volume = 0.5;
          }}
        />
      );
    }
    if (volume >= 0.1 && volume <= 0.7) {
      return (
        <VolumeDownIcon
          className="text-teal-500 cursor-pointer"
          onClick={() => {
            setVolume(0);
            audioRef.current!.volume = 0;
          }}
        />
      );
    }
    return (
      <VolumeUpIcon
        className="text-teal-500 cursor-pointer"
        onClick={() => {
          setVolume(0);
          audioRef.current!.volume = 0;
        }}
      />
    );
  }

  function segundosParaMinESegundos(segundos: number = 0, isCurrent: boolean) {
    segundos = Math.floor(segundos);
    if (segundos < 60) {
      if (isCurrent) {
        setDuracaoMusicaFormatada(
          `00:${segundos < 10 ? "0" + segundos : segundos}`
        );
        return;
      } else {
        return `00:${segundos < 10 ? "0" + segundos : segundos}`;
      }
    }
    let minutes: number | string = Math.floor(segundos / 60);
    let extraSeconds: number | string = segundos % 60;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    extraSeconds = extraSeconds < 10 ? "0" + extraSeconds : extraSeconds;

    if (isCurrent) {
      setDuracaoMusicaFormatada(`${minutes}:${extraSeconds}`);
      return;
    } else {
      return `${minutes}:${extraSeconds}`;
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setDuracaoTotal(
        segundosParaMinESegundos(audioRef.current?.duration, false)
      );
    }, 200);

    const intervalo = setInterval(() => {
      segundosParaMinESegundos(audioRef.current!.currentTime, true);
      setDuracaoMusica(audioRef.current!.currentTime);
    }, 200);

    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    if (isPlaying)
      setTimeout(() => {
        audioRef.current?.play();
      }, 200);
  }, [musicaId]);

  return (
    <div className="flex pl-4 pr-4 justify-center items-center w-full text-center">
      <Head>
        <title>
          Tocando agora: {musics[musicaId].nome} - {duracaoMusicaFormatada}
        </title>
      </Head>
      <div className="flex flex-col gap-4 w-full lg:w-1/3">
        <div className="flex gap-2 items-center justify-center">
          {handleVolumeIcon()}
          <input
            className=" accent-teal-500 w-full"
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={volume}
            onChange={(e) => mudarVolume(e)}
          />
        </div>
        <img
          className="rounded-full w-42 h-42 border-4 border-teal-400 shadow-md"
          src={musics[musicaId].image}
          alt=""
        />
        <audio
          onPlay={() => setIsPlaying(true)}
          ref={audioRef}
          src={musics[musicaId].url}
        ></audio>
        <div className="flex flex-col gap-4 text-teal-400 font-semibold items-center">
          <p className="text-xl font-bold">{musics[musicaId].nome}</p>
          <div className="w-full max-w-[500px] flex gap-2">
            <span>
              <span>{duracaoMusicaFormatada}</span>
            </span>
            <input
              className=" accent-teal-500 w-full"
              type="range"
              min={0}
              max={audioRef.current?.duration}
              step={0.01}
              value={duracaoMusica}
              onChange={(e) => mudarDuracaoMusica(e)}
            />
            {duracaoTotal}
          </div>
          <div className="flex gap-8">
            <button className="hover:scale-110 transition-all">
              <SkipPreviousIcon onClick={() => musicaAnterior()} />
            </button>
            <button
              className="hover:scale-110 transition-all"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <PauseIcon onClick={() => pausarMusica()} />
              ) : (
                <PlayArrowIcon onClick={() => tocarMusica()} />
              )}
            </button>
            <button className="hover:scale-110 transition-all">
              <SkipNextIcon onClick={() => proximaMusica()} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
