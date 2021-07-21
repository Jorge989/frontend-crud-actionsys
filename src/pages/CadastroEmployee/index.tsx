import { useState } from "react";
import api from "../../services/api";

import { Link, useHistory, useLocation } from "react-router-dom";
import "./styles-employes.css";
import { FaSpinner } from "react-icons/fa";
interface IEmployee {
  name: string;
  id: number;
  email: string;
}
function CadastroEmpolyee() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [datanascimento, setDatanascimento] = useState("");
  const [dataadmissão, setDataadmissão] = useState("");
  const [nivel, setNivel] = useState("");
  const [setor, setSetor] = useState("");
  const [cargo, setCargo] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isChangeBackground, setIsChangeBackground] = useState(false);
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  function changebackground() {
    const input1 = document.getElementById("input1") as HTMLInputElement;
    const input2 = document.getElementById("input2") as HTMLInputElement;
    const input3 = document.getElementById("input3") as HTMLInputElement;
    const input4 = document.getElementById("input4") as HTMLInputElement;
    const input5 = document.getElementById("input5") as HTMLInputElement;
    const input6 = document.getElementById("input6") as HTMLInputElement;
    const input7 = document.getElementById("input7") as HTMLInputElement;
    if (
      input1.value !== "" &&
      input2.value !== "" &&
      input3.value !== "" &&
      input4.value !== "" &&
      input5.value !== "" &&
      input6.value !== "" &&
      input7.value !== ""
    ) {
      setIsChangeBackground(true);
    } else {
      setIsChangeBackground(false);
    }
  }
  async function handleregister() {
    setLoading(true);
    try {
      const { data } = await api.post("funcionarios", {
        nome: name,

        email: email,
        data_nascimento: datanascimento,
        nivel: nivel,
        data_admissao: dataadmissão,
        setor: setor,
        cargo: cargo,
      });

      setLoading(false);
      setEmployees((state) => [...state, data]);

      console.log(data);
      history.push("/home");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container1">
      <form
        className="form-employe"
        onSubmit={(e) => {
          e.preventDefault();
          handleregister();
        }}
      >
        <label>Nome</label>
        <input
          id="input1"
          onChange={(e) => {
            changebackground();
            setName(e.target.value);
          }}
          placeholder="Digite seu nome"
        ></input>
        <label>E-mail</label>
        <input
          id="input2"
          onChange={(e) => {
            changebackground();
            setEmail(e.target.value);
          }}
          placeholder="Digite seu e-mail"
        ></input>
        <label>Data_nascimento</label>
        <input
          min="1800-04-01"
          required
          id="input3"
          onChange={(e) => {
            changebackground();
            setDatanascimento(e.target.value);
          }}
          type="date"
        ></input>
        <label>Data_admissão</label>
        <input
          id="input4"
          onChange={(e) => {
            changebackground();
            setDataadmissão(e.target.value);
          }}
          type="date"
        ></input>
        <label>Nível</label>
        <select
          id="input5"
          onChange={(e) => {
            changebackground();
            setNivel(e.target.value);
          }}
          placeholder="Nível"
        >
          <option value="select" disabled selected>
            Selecione seu nível:
          </option>
          <option value="Estagiário">Estagiário</option>
          <option value="Junior">Junior</option>
          <option value="Pleno">Pleno</option>
          <option value="Sênior">Sênior</option>
        </select>
        <label>Setor</label>
        <select
          id="input6"
          onChange={(e) => {
            changebackground();
            setSetor(e.target.value);
          }}
          placeholder="Selecione seu Setor"
        >
          <option value="" disabled selected>
            Selecione seu Setor
          </option>

          <option value="Engenharia">Engenharia</option>
          <option value="Compras">Compras</option>
          <option value="Vendas">Vendas</option>
          <option value="Financeiro">Financeiro</option>
        </select>
        <label>Cargo</label>

        <select
          id="input7"
          onChange={(e) => {
            changebackground();
            setCargo(e.target.value);
          }}
          placeholder="Cargo"
        >
          <option value="select" disabled selected>
            Selecione seu Cargo:
          </option>
          <option value="Auxiliar">Auxiliar</option>
          <option value="Técnico">Técnico</option>
          <option value="Engenheiro">Engenheiro</option>
          <option value="Diretor">Diretor</option>
        </select>
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
  );
}
export default CadastroEmpolyee;
