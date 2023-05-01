import React, { useState } from "react";
import { useContext } from "react";
import { NomeUsuario, MudarMenuExpandido, MenuExpandido } from "../pages/_app";
import { musics } from "@/data/musics";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "next-themes";

const NavBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const nomeUsuario = useContext(NomeUsuario);
  const mudarMenuExpandido = useContext(MudarMenuExpandido);
  const menuExpandido = useContext(MenuExpandido);

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
          {theme === "dark" ? (
            <LightModeIcon
              className=" cursor-pointer hover:text-teal-600 transition"
              onClick={() => setTheme("light")}
            />
          ) : (
            <DarkModeIcon
              className=" cursor-pointer hover:text-teal-600 transition"
              onClick={() => setTheme("dark")}
            />
          )}
        </div>
        <div className="flex flex-col gap-4 items-center">
          <img
            className="rounded-full w-[50%] h-[50%]"
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Usuario"
          />
          <p className="text-lg font-bold text-center">Olá {nomeUsuario}!</p>
          <p className="text-center">Agora está tocando</p>
          <div
            className={`flex gap-1  shadow-md border-2 rounded-lg p-4 items-center w-full ${
              menuExpandido ? "flex-row" : "flex-col gap-4"
            }`}
          >
            <img
              className="rounded-full w-12 h-12 shadow-md"
              src={musics[0].image}
              alt=""
            />
            <div
              className={`flex flex-col w-full overflow-auto scrollbar scrollbar-thumb-rounded scrollbar-track-rounded scrollbar-h-1 scrollbar-thumb-teal-100 scrollbar-track-gray-600`}
            >
              {menuExpandido && <p>{musics[0].nome}</p>}
              <span
                className={`text-sm text-gray-100 opacity-70 sticky left-0 ${
                  menuExpandido ? "text-end" : "text-center"
                }`}
              >
                tempo
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
            <motion.div exit={{ opacity: 0 }}>
              <motion.p
                initial={{ x: "-100" }}
                animate={{ x: 0 }}
                exit={{ x: "-100" }}
                transition={{ delay: 0.1 }}
              >
                a
              </motion.p>
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
