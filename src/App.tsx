import React from "react";
import Routes from "./routes";
import { AuthProvider } from "../src/hooks/AuthContext";
import UpdateContext from "./hooks/UpdateContext";
import "./styles/global.scss";
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <UpdateContext>
          <Routes />
        </UpdateContext>
      </AuthProvider>
    </div>
  );
}

export default App;
