import React, { createContext, useContext, useState } from "react";
import TokenService from "../services/token.service";

import { useSnackbar } from "notistack";

const AuthContext = createContext();

export function AuthProvider(props) {
  const [usuario, setUsuario] = useState(TokenService.GetUser());
  const [msgError, setMsgError] = useState(null);
  const [msgSuccess, setMsgSuccess] = useState(null);

  const { enqueueSnackbar } = useSnackbar(); 

  const MessageSuccess = (message) =>{
    enqueueSnackbar(message, {
      variant: "success",
      preventDuplicate: true,
    });
  }

  const MessageError = (message) =>{
    enqueueSnackbar(message, {
      variant: "error",
      preventDuplicate: true,
    });    
  }

  return (
    <AuthContext.Provider
      value={{
        usuario,
        setUsuario,
        msgError,
        setMsgError,
        msgSuccess,
        setMsgSuccess,        
        MessageSuccess,
        MessageError
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
