import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useState } from "react";

export const NomeUsuario = createContext("");
export const EmailUsuario = createContext("");
export const MudarNomeUsuario = createContext((nome: string) => {});
export const MudarEmailUsuario = createContext((email: string) => {});
export const MenuExpandido = createContext(true);
export const MudarMenuExpandido = createContext(() => {});

export default function App({ Component, pageProps }: AppProps) {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [emailUsuario, setEmailUsuario] = useState("");
  const [menuExpandido, setMenuExpandido] = useState(true);

  const mudarMenuExpandido = () => {
    setMenuExpandido((prev) => !prev);
  };

  function mudarNomeUsuario(nome: string) {
    setNomeUsuario(nome);
  }
  function mudarEmailUsuario(email: string) {
    setEmailUsuario(email);
  }

  return (
    <NomeUsuario.Provider value={nomeUsuario}>
      <EmailUsuario.Provider value={emailUsuario}>
        <MudarEmailUsuario.Provider value={mudarEmailUsuario}>
          <MudarNomeUsuario.Provider value={mudarNomeUsuario}>
            <MenuExpandido.Provider value={menuExpandido}>
              <MudarMenuExpandido.Provider value={mudarMenuExpandido}>
                <Component {...pageProps} />
              </MudarMenuExpandido.Provider>
            </MenuExpandido.Provider>
          </MudarNomeUsuario.Provider>
        </MudarEmailUsuario.Provider>
      </EmailUsuario.Provider>
    </NomeUsuario.Provider>
  );
}
