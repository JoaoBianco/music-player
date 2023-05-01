import React from "react";
import { useContext } from "react";
import { NomeUsuario, EmailUsuario } from "./_app";

const App = () => {
  const nomeUsuario = useContext(NomeUsuario);
  const emailUsuario = useContext(EmailUsuario);

  return <div>{nomeUsuario + " " + emailUsuario}</div>;
};

export default App;
