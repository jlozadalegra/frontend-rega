import React, { createContext, useContext, useState } from "react";
import TokenService from "../services/token.service";

const AuthContext = createContext();

export function AuthProvider(props) {
  const [usuario, setUsuario] = useState(TokenService.GetUser());
  const [msgError, setMsgError] = useState(null);
  const [msgSuccess, setMsgSuccess] = useState(null);

  const CustomMsgError = (value) => {
    if (value) {
      switch (value.statusCode) {
        case 404: {
          setMsgError("Registro no encontrado");
          break;
        }
        case 500: {
          setMsgError("Error interno del Servidor SQL");
          break;
        }
        default:
          setMsgError(value.message);
      }
    } else setMsgError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        setUsuario,
        msgError,
        setMsgError,
        msgSuccess,
        setMsgSuccess,
        CustomMsgError,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
