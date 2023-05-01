import React from "react";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

import { useFormik } from "formik";
import * as Yup from "yup";

const Auth = () => {
  const formik = useFormik({
    initialValues: {
      nome: "",
      email: "",
      senha: "",
      confirmarSenha: "",
    },

    validationSchema: Yup.object({
      nome: Yup.string()
        .required("Nome obrigatário")
        .min(3, "Mínimo 3 caracteres")
        .max(20, "Máximo 20 caracteres"),
      email: Yup.string()
        .email("E-mail inválido")
        .required("E-mail obrigatário"),
      senha: Yup.string()
        .required("Senha obrigatária")
        .min(6, "Mínimo 6 caracteres")
        .max(20, "Máximo 20 caracteres"),
      confirmarSenha: Yup.string()
        .min(6, "Mínimo 6 caracteres")
        .max(20, "Máximo 20 caracteres")
        .oneOf([Yup.ref("senha")], "Senhas não conferem"),
    }),

    onSubmit: (values) => {
      console.log(values);
    },
  });

  function whatIconButton(quantity: number) {
    console.log("oi");
    if (quantity === 1) {
      return <SentimentNeutralIcon />;
    }
    if (quantity >= 3) {
      return <SentimentVeryDissatisfiedIcon />;
    }
    if (quantity >= 1) {
      return <SentimentDissatisfiedIcon />;
    }
    return <SentimentVerySatisfiedIcon />;
  }

  return (
    <div className="w-screen h-screen dark:bg-zinc-700 flex flex-col items-center justify-center dark:text-white">
      <h2 className="text-2xl lg:text-5xl font-bold">Crie sua conta!</h2>
      <div className="p-4 w-full lg:w-1/2">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div className="grid">
            <label
              className={`text-sm ml-1 text-zinc-500 dark:text-white ${
                formik.errors.nome && formik.touched.nome
                  ? "text-red-500"
                  : "text-zinc-500"
              }`}
              htmlFor="nome"
            >
              {formik.errors.nome && formik.touched.nome
                ? formik.errors.nome
                : "Nome:"}
            </label>
            <input
              id="nome"
              value={formik.values.nome}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              className={`border-2 border-teal-500 rounded-xl p-2 focus:outline-none focus:ring-0 focus:border-teal-600 transition ${
                formik.errors.nome && formik.touched.nome
                  ? "border-red-400 focus:border-red-500"
                  : ""
              }`}
            />
          </div>
          <div className="grid">
            <label
              htmlFor="email"
              className={`text-sm ml-1 text-zinc-500 dark:text-white ${
                formik.errors.email && formik.touched.email
                  ? "text-red-500"
                  : "text-zinc-500"
              }`}
            >
              {formik.errors.email && formik.touched.email
                ? formik.errors.email
                : "E-mail:"}
            </label>
            <input
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              autoComplete="new-email"
              className={`border-2 border-teal-500 rounded-xl p-2 focus:outline-none focus:ring-0 focus:border-teal-600 transition ${
                formik.errors.email && formik.touched.email
                  ? "border-red-400 focus:border-red-500"
                  : ""
              }`}
            />
          </div>
          <div className="grid">
            <label
              htmlFor="senha"
              className={`text-sm ml-1 text-zinc-500 dark:text-white ${
                formik.errors.senha && formik.touched.senha
                  ? "text-red-500"
                  : "text-zinc-500"
              }`}
            >
              {formik.errors.senha && formik.touched.senha
                ? formik.errors.senha
                : "Senha:"}
            </label>
            <input
              id="senha"
              value={formik.values.senha}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              autoComplete="new-password"
              className={`border-2 border-teal-500 rounded-xl p-2 focus:outline-none focus:ring-0 focus:border-teal-600 transition ${
                formik.errors.senha && formik.touched.senha
                  ? "border-red-400 focus:border-red-500"
                  : ""
              }`}
            />
          </div>
          <div className="grid">
            <label
              htmlFor="confirmarSenha"
              className={`text-sm ml-1 text-zinc-500 dark:text-white ${
                formik.errors.confirmarSenha && formik.touched.confirmarSenha
                  ? "text-red-500"
                  : "text-zinc-500"
              }`}
            >
              {formik.errors.confirmarSenha && formik.touched.confirmarSenha
                ? formik.errors.confirmarSenha
                : "Confirmar senha:"}
            </label>
            <input
              id="confirmarSenha"
              value={formik.values.confirmarSenha}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              autoComplete="new-password"
              className={`border-2 border-teal-500 rounded-xl p-2 focus:outline-none focus:ring-0 focus:border-teal-600 transition ${
                formik.errors.confirmarSenha && formik.touched.confirmarSenha
                  ? "border-red-400 focus:border-red-500"
                  : ""
              }`}
            />
          </div>
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 flex gap-2 justify-center text-white rounded-xl shadow-sm p-2 cursor-pointer transition font-semibold"
          >
            Criar conta
            {whatIconButton(Object.keys(formik.errors).length)}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
