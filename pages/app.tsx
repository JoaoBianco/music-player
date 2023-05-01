import React from "react";
import { useContext } from "react";
import { NomeUsuario, EmailUsuario } from "./_app";
import NavBar from "@/components/NavBar";

const App = () => {
  const nomeUsuario = useContext(NomeUsuario);
  const emailUsuario = useContext(EmailUsuario);

  return (
    <div className="flex bg-red-200 h-screen">
      <NavBar />
    </div>
  );
};

export default App;
