import React, { useEffect, useState } from "react";
import { useContext } from "react";
import {
  NomeUsuario,
  MudarMenuExpandido,
  MenuExpandido,
  MusicaId,
} from "../pages/_app";
import { musics } from "@/data/musics";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "next-themes";
import NavBarMusicItem from "./NavBarMusicItem";

type NavBarProps = {
  duracaoMusicaFormatada: string;
};

const NavBar: React.FC<NavBarProps> = ({ duracaoMusicaFormatada }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [iconDarkOrLight, setIconDarkOrLight] = useState<
    JSX.Element | undefined
  >(undefined);

  const nomeUsuario = useContext(NomeUsuario);
  const mudarMenuExpandido = useContext(MudarMenuExpandido);
  const menuExpandido = useContext(MenuExpandido);
  const musicaId = useContext(MusicaId);

  function returnThemeIcon() {
    if (theme === "dark") {
      return (
        <LightModeIcon
          className=" cursor-pointer hover:text-teal-600 transition"
          onClick={() => setTheme("light")}
        />
      );
    } else {
      return (
        <DarkModeIcon
          className=" cursor-pointer hover:text-teal-600 transition"
          onClick={() => setTheme("dark")}
        />
      );
    }
  }

  useEffect(() => {
    setIconDarkOrLight(returnThemeIcon());
  }, [theme]);

  return (
    <nav
      className={`bg-teal-400 dark:bg-gray-800 transition-all ease-in-out duration-300 shadow-2xl flex flex-col items-center p-4 text-white max-w-[250px] w-${
        menuExpandido ? "full" : "32 "
      }`}
    >
      <div>
        <div className="flex justify-between w-auto mb-4">
          <MenuIcon
            className="cursor-pointer hover:text-teal-600 transition"
            onClick={mudarMenuExpandido}
          />
          {iconDarkOrLight}
        </div>
        <div className="flex flex-col gap-4 items-center">
          <img
            className="rounded-full w-[50%] h-[50%]"
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Usuario"
          />
          <p className="text-lg font-bold text-center">Olá {nomeUsuario}!</p>
          <div
            className={`flex gap-1 shadow-md border-2 rounded-lg p-4 items-center w-full ${
              menuExpandido ? "flex-col lg:flex-row" : "flex-col gap-4"
            }`}
          >
            <img
              className="rounded-full w-12 h-12 shadow-md"
              src={musics[musicaId].image}
              alt=""
            />
            <div
              className={`flex flex-col w-full overflow-auto scrollbar scrollbar-thumb-rounded scrollbar-track-rounded scrollbar-h-1 scrollbar-thumb-teal-100 scrollbar-track-gray-600`}
            >
              {menuExpandido && <p>{musics[musicaId].nome}</p>}
              {!menuExpandido && (
                <p className="text-xs text-center">{musics[musicaId].nome}</p>
              )}
              <span
                className={`text-sm text-gray-100 opacity-70 sticky left-0 ${
                  menuExpandido ? "text-end" : "text-center"
                }`}
              >
                {duracaoMusicaFormatada}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`mt-4 shadow-md border-2 rounded-lg w-full p-${
          menuExpandido ? "4" : "1"
        }`}
      >
        <p
          onClick={() => {
            setIsExpanded((prev) => !prev);
          }}
          className="flex justify-between cursor-pointer"
        >
          Músicas{" "}
          <KeyboardArrowDownIcon
            className={`${isExpanded ? "rotate-180" : "rotate-0"} transition`}
          />
        </p>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="flex flex-col gap-4 overflow-y-auto h-full max-h-48 lg:max-h-[80vh] "
              exit={{ opacity: 0 }}
            >
              {musics.map((music, index) => (
                <NavBarMusicItem key={index} music={music} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div
        onClick={() => router.push("/auth")}
        className="mt-auto w-full shadow-md border-2 rounded-lg text-center hover:bg-teal-600 transition"
      >
        <p className="font-bold cursor-pointer  p-4">Sair </p>
      </div>
    </nav>
  );
};

export default NavBar;
