import React, { createContext, useContext, useState } from "react";
interface IEmployeeUP {
  nome: string;
  email: string;
  data_nascimento: string;
  data_admissao: string;
  nivel: string;
  setor: string;
  cargo: string;
  id: number;
  username: string;
  setNome: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setDatanascimento: React.Dispatch<React.SetStateAction<string>>;
  setDataadmissao: React.Dispatch<React.SetStateAction<string>>;
  setNivel: React.Dispatch<React.SetStateAction<string>>;
  setSetor: React.Dispatch<React.SetStateAction<string>>;
  setCargo: React.Dispatch<React.SetStateAction<string>>;
  setId: React.Dispatch<React.SetStateAction<number>>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
}

const ShowContext = createContext({});
export default function CupomProvider({ children }: any) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [data_nascimento, setDatanascimento] = useState("");
  const [data_admissao, setDataadmissao] = useState("");
  const [nivel, setNivel] = useState("");
  const [setor, setSetor] = useState("");
  const [cargo, setCargo] = useState("");
  const [id, setId] = useState(0);
  const [username, setUserName] = useState("");
  return (
    <ShowContext.Provider
      value={{
        nome,
        setNome,
        email,
        setEmail,
        data_nascimento,
        setDatanascimento,
        data_admissao,
        setDataadmissao,
        nivel,
        setNivel,
        setor,
        setSetor,
        cargo,
        setCargo,
        id,
        setId,
        username,
        setUserName,
      }}
    >
      {children}
    </ShowContext.Provider>
  );
}
export function useSHow() {
  const context = useContext(ShowContext) as IEmployeeUP;
  const { nome, setNome } = context;
  const { email, setEmail } = context;
  const { data_nascimento, setDatanascimento } = context;
  const { data_admissao, setDataadmissao } = context;
  const { nivel, setNivel } = context;
  const { setor, setSetor } = context;
  const { cargo, setCargo } = context;
  const { id, setId } = context;
  const { username, setUserName } = context;

  if (!context) {
    throw new Error("useCupom must be used whitin a CupomProvider");
  }

  return context;
}
