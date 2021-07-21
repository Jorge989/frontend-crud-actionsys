import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";
import "./styles.scss";
import { FaSpinner } from "react-icons/fa";
import { FiEyeOff } from "react-icons/fi";
import { useFormik } from "formik";
import { useAuth } from "../../hooks/AuthContext";
function Cadastro() {
  const { signIn } = useAuth();
  const history = useHistory();
  const [isChangeBackground, setIsChangeBackground] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [inputType, setInputType] = useState("password");
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown === true ? false : true);
    setInputType(inputType === "password" ? "text" : "password");
  };
  function changebackground() {
    const input1 = document.getElementById("input1") as HTMLInputElement;
    const input2 = document.getElementById("input2") as HTMLInputElement;
    if (input1.value !== "" && input2.value !== "") {
      setIsChangeBackground(true);
    } else {
      setIsChangeBackground(false);
    }
  }

  async function handleregister() {
    setLoading(true);
    api
      .post("users", {
        email: email,
        password: senha,
      })
      .then(function (response) {
        setTimeout(function () {
          setLoading(false);
          console.log("aqui" + response);
        }, 1000);
        history.push("/login");
      })
      .catch(function (error) {
        setTimeout(function () {
          setLoading(false);

          console.log(error);
        }, 1000);
      });
  }
  return (
    <div className="container">
      <div className="content-cadastro">
        {" "}
        <h1>Cadastre-se</h1>
        <p>
          Já possui uma conta?{" "}
          <strong>
            <a href="/login">Login</a>
          </strong>
        </p>
        <form
          className="input-box"
          onSubmit={(e) => {
            e.preventDefault();
            handleregister();
          }}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            required
            name="email"
            id="input1"
            onChange={(e) => {
              changebackground();
              setEmail(e.target.value);
            }}
            type="email"
            title="Por favor informar senha"
            placeholder="Seu melhor e-mail"
          ></input>
          <label htmlFor="senha" id="label2">
            Senha
          </label>
          <div className="input-password">
            <input
              required
              name="senha"
              id="input2"
              onChange={(e) => {
                changebackground();
                setSenha(e.target.value);
              }}
              type={inputType}
              pattern="(?=.*[a-z]).{6,}"
              placeholder="Senha deve conter mais de 6 caracteres"
            ></input>
            <FiEyeOff
              className="mask"
              onClick={togglePasswordVisiblity}
              color="#7979ff"
              cursor="pointer"
              size={20}
            />
          </div>
          {!isLoading && (
            <button
              type="submit"
              className={isChangeBackground ? "botao-login2" : "botao-login"}
            >
              Confirmar
            </button>
          )}
          {isLoading && (
            <button
              className={isChangeBackground ? "botao-login2" : "botao-login"}
              type="submit"
              disabled
            >
              Confirmar
              <FaSpinner className="spinner" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Cadastro;
