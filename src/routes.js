import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import CadastroEmployee from "./pages/CadastroEmployee";
import AtualziarEmployee from "./pages/AtualizarEmployee";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Cadastro} />
        <Route path="/login" exact component={Login} />
        <Route path="/home" exact component={Home} />
        <Route path="/cadastro" exact component={CadastroEmployee} />
        <Route path="/atualizar" exact component={AtualziarEmployee} />
      </Switch>
    </BrowserRouter>
  );
}
