import { useUpdate } from "../../hooks/UpdateContext";
import { useSHow } from "../../hooks/ShowContext";
import { useAuth } from "../../hooks/AuthContext";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import Modal from "../../components/Modal";
import api from "../../services/api";
import { useHistory, useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import "./styles.css";
interface IEmployee {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  nivel: string;
  setor: string;
  data_nascimento: string;
  data_admissao: string;
}

function Employees() {
  const [showModal, setShowModal] = useState(false);
  const OpenModal = () => {
    setShowModal((prev) => !prev);
  };
  const { signOut, user } = useAuth();
  const { nome, setNome } = useUpdate();
  const { email, setEmail } = useUpdate();

  const { data_nascimento, setDatanascimento } = useUpdate();
  const { data_admissao, setDataadmissao } = useUpdate();
  const { cargo, setCargo } = useUpdate();
  const { setor, setSetor } = useUpdate();
  const { nivel, setNivel } = useUpdate();
  const { id, setId } = useUpdate();

  const { username, setUserName } = useSHow();
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  console.log(nome);
  const history = useHistory();
  useEffect(() => {
    api.get(`funcionarios`).then((response) => {
      console.log(response.data);
      setEmployees(response.data);
      console.log("aqui", employees);
    });
  }, []);

  function updateEmployee(id: number) {
    setId(id);
    setNome(nome);
    setEmail(email);
    setDatanascimento(data_nascimento);
    setDataadmissao(data_admissao);
    setCargo(cargo);
    setSetor(setor);
    setNivel(nivel);
    console.log(nome);
    console.log(email);
    console.log(data_nascimento);
    console.log(data_admissao);

    history.push("/atualizar");
  }
  function seeEmployee(id: number) {
    setId(id);
    setNome(nome);
    setEmail(email);
    setDatanascimento(data_nascimento);
    setDataadmissao(data_admissao);
    setCargo(cargo);
    setSetor(setor);
    setNivel(nivel);
    console.log(nome);
    console.log(email);
    console.log(data_nascimento);
    console.log(data_admissao);
  }

  async function deleteEmployee(id: number) {
    try {
      const response = await api.delete(`funcionarios/${id}`);
      setEmployees((oldEmployees) =>
        oldEmployees.filter((employee) => employee.id !== id)
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const formatDate = (date: Date): string => {
    return String(format(date, "yyyy-MM-dd").toLocaleString());
  };
  console.log(username);
  return (
    <body>
      <div className="container">
        <div className="table">
          <div className="btn-adicionar">
            <a onClick={signOut} id="sair">
              <FaAngleLeft />
              Sair
            </a>
            <a href="/cadastro" id="adicionar">
              <FaPlus />
              Adicionar
            </a>
          </div>
        </div>
        <Modal showModal={showModal} setShowModal={setShowModal} />
        <table className="table">
          <thead>
            <th>Nome</th>
            <th>Email</th>
            <th>Data_nascimento</th>
            <th>Data_admissao</th>
            <th>Setor</th>
            <th>Cargo</th>
            <th>Nivel</th>
            <th>Editar</th>
            <th>Visualizar</th>
            <th>Deletar</th>
          </thead>
          <tbody>
            {employees.map((employes) => (
              <tr>
                <td data-label="Nome">{employes.nome}</td>
                <td data-label="Email">{employes.email}</td>
                <td data-label="Data_nascimento">
                  {formatDate(new Date(employes.data_nascimento))}
                </td>
                <td data-label="Data_admissao">
                  {" "}
                  {formatDate(new Date(employes.data_admissao))}
                </td>
                <td data-label="Setor">{employes.setor}</td>
                <td data-label="Cargo">{employes.cargo}</td>
                <td data-label="Nivel">{employes.nivel}</td>
                <td data-label="Editar">
                  {" "}
                  <button
                    id="bnt-editar"
                    onClick={() => {
                      updateEmployee(employes.id);
                      setNome(employes.nome);
                      setEmail(employes.email);
                      setDatanascimento(
                        formatDate(new Date(employes.data_nascimento))
                      );
                      setDataadmissao(
                        formatDate(new Date(employes.data_admissao))
                      );
                      setCargo(employes.cargo);
                      setSetor(employes.setor);
                      setNivel(employes.nivel);
                    }}
                  >
                    Editar
                  </button>
                </td>
                <td data-label="Vizualizar">
                  {" "}
                  <button
                    onClick={() => {
                      seeEmployee(employes.id);
                      setNome(employes.nome);
                      setEmail(employes.email);
                      setDatanascimento(
                        formatDate(new Date(employes.data_nascimento))
                      );
                      setDataadmissao(
                        formatDate(new Date(employes.data_admissao))
                      );
                      setCargo(employes.cargo);
                      setSetor(employes.setor);
                      setNivel(employes.nivel);
                      OpenModal();
                    }}
                    id="btn-visualizar"
                  >
                    Visualizar
                  </button>
                </td>
                <td data-label="Deletar">
                  {" "}
                  <button
                    id="btn-deletar"
                    onClick={() => deleteEmployee(employes.id)}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </body>
  );
}

export default Employees;
