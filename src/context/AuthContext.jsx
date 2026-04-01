import axios from "axios";
import { useReducer, useEffect } from "react";
import { createContext } from "react";
import { baseUrl } from "../config/ApiRoutes";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const initialState = {
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { userInfo: action.payload };
    case "getMe":
      return { userInfo: action.payload };
    case "logout":
      return { userInfo: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const loginUser = async (email, password) => {
    try {
      let res;

      try {
        res = await axios.post(`${baseUrl}/users/login`, { email, password });
      } catch (err) {
        res = await axios.post(`${baseUrl}/instructor/login`, {
          email,
          password,
        });
      }

      const userData = res.data.userData || res.data.instructorData;
      const token = res.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("userInfo", JSON.stringify(userData));

      dispatch({ type: "login", payload: userData });

      return userData;
    } catch (error) {
      console.log("Login error:", error.response?.data || error.message);
      return null;
    }
  };

  const getMe = async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const res = await axios.get(`${baseUrl}/get-me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = res.data.userData;
      dispatch({ type: "getMe", payload: userData });

      localStorage.setItem("userInfo", JSON.stringify(userData));

      return userData;
    } catch (error) {
      console.log(error.response?.data || error.message);
      logout();
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    dispatch({ type: "logout" });
    toast.info("Logged out");
  };

  useEffect(() => {
    if (!state.userInfo) {
      getMe();
    }
  }, [state.userInfno]);

  return (
    <AuthContext.Provider value={{ state, loginUser, getMe, logout, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
