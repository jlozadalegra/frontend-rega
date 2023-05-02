import instance from "../api/axios";
import { AXIOSCONST } from "../constants/axios.constants";
import TokenService from "./token.service";

const login = async (userid, password) => {
  let resp = "";  

  const UserID = parseInt(userid);

  try {
    resp = await instance({
      method: "post",
      url: AXIOSCONST.LOGIN,
      data: {
        usuario: UserID,
        password: password,
      },
    })
      .then((response) => {        
        if (response.data.data.accessToken) {  
          console.log("login", response.data.data);
          TokenService.SetUser(response.data.data);
        }
        return response.data;
      })
      .catch((error) => {        
        console.error("Error LOGIN", error.response);
        return error.response.data;
      });
  } catch (error) {
    console.error("LoginTry", error);
  }

  return resp;
};

const AuthService = {
  login,
};

export default AuthService;
