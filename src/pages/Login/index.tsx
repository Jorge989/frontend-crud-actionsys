import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSHow } from "../../hooks/ShowContext";
import api from "../../services/api";
import "./styles.login.scss";
import { FaSpinner } from "react-icons/fa";
import { FiEyeOff } from "react-icons/fi";
import { useAuth } from "../../hooks/AuthContext";
function Login() {
  const { signIn } = useAuth();
  const history = useHistory();
  const [isChangeBackground, setIsChangeBackground] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [inputType, setInputType] = useState("password");
  const [error, setError] = useState(false);
  const { username, setUserName } = useSHow();
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
      .post("auth", {
        email: email,
        password: senha,
      })
      .then(function (response) {
        setTimeout(function () {
          signIn({
            email: email,
            password: senha,
          });
          setLoading(false);
          console.log(response.data);
          setUserName(response.data.user.email);
          history.push("/home", {
            token: response.data.token,
            username: response.data.user.email,
            userId: response.data.user.id,
          });
        }, 1000);
      })
      .catch(function (error) {
        setError(true);
        setTimeout(function () {
          setLoading(false);

          console.log("aquiii", { error });
        }, 1000);
      });
  }

  return (
    <div className="container">
      <div className="content-cadastro">
        {" "}
        <h1>Login</h1>
        <p>
          ainda não tem cadastro?{" "}
          <strong>
            <a href="/">Cadastre-se</a>
          </strong>
        </p>
        <form
          className="input-box"
          onSubmit={(e) => {
            e.preventDefault();
            handleregister();
          }}
        >
          <label>E-Mail</label>

          <input
            id="input1"
            onChange={(e) => {
              changebackground();
              setEmail(e.target.value);
            }}
            type="email"
            title="Por favor informar senha"
            required
            placeholder="Seu melhor e-mail"
          ></input>

          <label id="label2">Senha</label>
          <div className="input-password">
            <input
              required
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
      <div className="error">{error && <p>Usuário não econtrado.</p>}</div>
    </div>
  );
}

export default Login;
