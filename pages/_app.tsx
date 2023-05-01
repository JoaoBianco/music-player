import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useState } from "react";
import { ThemeProvider } from "next-themes";

export const NomeUsuario = createContext("");
export const EmailUsuario = createContext("");
export const MudarNomeUsuario = createContext((nome: string) => {});
export const MudarEmailUsuario = createContext((email: string) => {});
export const MenuExpandido = createContext(true);
export const MudarMenuExpandido = createContext(() => {});
export const MusicaId = createContext(0);
export const MudarMusicaId = createContext((id: number) => {});

export default function App({ Component, pageProps }: AppProps) {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [emailUsuario, setEmailUsuario] = useState("");
  const [menuExpandido, setMenuExpandido] = useState(true);
  const [musicaId, setMusicaId] = useState(0);

  const mudarMenuExpandido = () => {
    setMenuExpandido((prev) => !prev);
  };

  function mudarNomeUsuario(nome: string) {
    setNomeUsuario(nome);
  }
  function mudarEmailUsuario(email: string) {
    setEmailUsuario(email);
  }
  function mudarMusicaId(id: number) {
    setMusicaId(id);
  }

  return (
    <NomeUsuario.Provider value={nomeUsuario}>
      <EmailUsuario.Provider value={emailUsuario}>
        <MudarEmailUsuario.Provider value={mudarEmailUsuario}>
          <MudarNomeUsuario.Provider value={mudarNomeUsuario}>
            <MenuExpandido.Provider value={menuExpandido}>
              <MudarMenuExpandido.Provider value={mudarMenuExpandido}>
                <ThemeProvider attribute="class" enableSystem={false}>
                  <MusicaId.Provider value={musicaId}>
                    <MudarMusicaId.Provider value={mudarMusicaId}>
                      <Component {...pageProps} />
                    </MudarMusicaId.Provider>
                  </MusicaId.Provider>
                </ThemeProvider>
              </MudarMenuExpandido.Provider>
            </MenuExpandido.Provider>
          </MudarNomeUsuario.Provider>
        </MudarEmailUsuario.Provider>
      </EmailUsuario.Provider>
    </NomeUsuario.Provider>
  );
}
