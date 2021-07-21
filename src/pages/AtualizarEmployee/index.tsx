import { useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import { format, parseISO } from "date-fns";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./styles-atualizar.css";
import { FaSpinner } from "react-icons/fa";
import { useUpdate } from "../../hooks/UpdateContext";
interface IEmployee {
  name: string;
  id: number;
  email: string;
}
function CadastroEmpolyee() {
  const { nome, setNome } = useUpdate();
  const { email, setEmail } = useUpdate();
  const { data_nascimento, setDatanascimento } = useUpdate();
  const { data_admissao, setDataadmissao } = useUpdate();
  const { cargo, setCargo } = useUpdate();
  const { setor, setSetor } = useUpdate();
  const { nivel, setNivel } = useUpdate();
  const { id, setId } = useUpdate();
  const history = useHistory();
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isChangeBackground, setIsChangeBackground] = useState(false);

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

  useEffect(() => {
    const formatDate = (date: Date): string => {
      return String(format(date, "yyyy-MM-dd").toLocaleString());
    };
    setDatanascimento(data_nascimento);
  }, [data_admissao, data_nascimento]);
  console.log("aquiidata", data_nascimento);

  async function handleregister() {
    setLoading(true);
    try {
      const { data } = await api.put(`funcionarios/${id}`, {
        nome: nome,

        email: email,
        data_nascimento: data_nascimento,
        nivel: nivel,
        data_admissao: data_admissao,
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
  const formatDate = (date: Date): string => {
    return String(format(date, "dd/MM/yyyy").toLocaleString());
  };

  // const birthdayDateFormated = useMemo(() => {
  //   const dataFormated = format(parseISO(data_nascimento), "yyyy-MM-dd");

  //   return dataFormated;
  // }, [data_nascimento]);
  return (
    <div className="container2">
      <form
        className="form-employe"
        onSubmit={(e) => {
          e.preventDefault();
          //   handleregister();
        }}
      >
        <label>Nome</label>
        <input
          required
          value={nome}
          id="input1"
          onChange={(e) => {
            changebackground();
            setNome(e.target.value);
          }}
          placeholder="Digite seu nome"
        ></input>
        <label>E-mail</label>
        <input
          required
          value={email}
          id="input2"
          onChange={(e) => {
            changebackground();
            setEmail(e.target.value);
          }}
          placeholder="Digite seu e-mail"
        ></input>
        <label>Data_nascimento</label>
        <input
          required
          value={data_nascimento}
          id="input3"
          type="date"
          onChange={(e) => {
            changebackground();
            setDatanascimento(e.target.value);
          }}
        ></input>
        <label>Data_admissão</label>
        <input
          required
          value={data_admissao}
          id="input4"
          type="date"
          onChange={(e) => {
            changebackground();
            setDataadmissao(e.target.value);
          }}
        ></input>
        <label>Nível</label>
        <select
          required
          value={nivel}
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
          required
          value={setor}
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
          required
          value={cargo}
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
            onClick={handleregister}
            type="submit"
            className={isChangeBackground ? "botao-login2" : "botao-login"}
          >
            Confirmar
          </button>
        )}
        {isLoading && (
          <button type="submit" disabled>
            Confirmar
            <FaSpinner className="spinner" />
          </button>
        )}
      </form>
    </div>
  );
}
export default CadastroEmpolyee;
