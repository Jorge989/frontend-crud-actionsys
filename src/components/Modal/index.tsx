import React from "react";
import "./style.css";
import { FaTimes } from "react-icons/fa";
import { useUpdate } from "../../hooks/UpdateContext";
export const Modal = ({ showModal, setShowModal }: any) => {
  const { nome, setNome } = useUpdate();
  const { email, setEmail } = useUpdate();
  const { data_nascimento, setDatanascimento } = useUpdate();
  const { data_admissao, setDataadmissao } = useUpdate();
  const { cargo, setCargo } = useUpdate();
  const { setor, setSetor } = useUpdate();
  const { nivel, setNivel } = useUpdate();
  const { id, setId } = useUpdate();
  return (
    <>
      {showModal ? (
        <div className="Background">
          <div className="ModalWrapper">
            <div className="container-modal">
              <div className="btn-div">
                <button id="btn-modal" onClick={() => setShowModal(!showModal)}>
                  <FaTimes />
                </button>
              </div>
              <div className="nome">
                <h1>
                  Nome: <strong className="nome1">{nome}</strong>
                </h1>
              </div>
              <div className="email">
                <p>Email:</p>
                <strong>{email}</strong>
              </div>
              <div className="data-nasc">
                <p>Data Nascimento:</p>
                <strong>{data_nascimento}</strong>
              </div>
              <div className="data-admin">
                <p>Data Adimissão:</p>
                <strong>{data_admissao}</strong>
              </div>
              <div className="setor">
                <p>Setor:</p>
                <strong>{setor}</strong>
              </div>
              <div className="cargo">
                <p>Cargo:</p>
                <strong>{cargo}</strong>
              </div>
              <div className="nivel">
                <p>Nivel:</p>
                <strong>{nivel}</strong>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
