import { useNavigate } from "react-router";
import { useAuth } from "../contexts/auth-context";
import axios from "axios";
import { useState } from "react";
import { API_STATUS, API_URL } from "../constants";

export const useAuthAPI = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState(API_STATUS.IDLE);
  const [signupStatus, setSignupStatus] = useState(API_STATUS.IDLE);
  const [errorMessage, setErrorMessage] = useState("");

  const login = async (userDetails, state) => {
    try {
      setLoginStatus(API_STATUS.LOADING);
      const { data, status } = await axios.post(
        `${API_URL}/user/login`,
        userDetails
      );

      if (status === 200) {
        setLoginStatus(API_STATUS.SUCCESS);
        setToken(data.token);
        navigate(state?.from ? state.from : "/");
        localStorage?.setItem("login", JSON.stringify({ token: data.token }));
      }
    } catch (error) {
      setLoginStatus(API_STATUS.ERROR);
      setErrorMessage(error.response.data.errorMessage);
    }
  };

  const signUp = async (userDetails, state) => {
    try {
      setSignupStatus(API_STATUS.LOADING);
      const { data, status } = await axios.post(
        `${API_URL}/user/signup`,
        userDetails
      );
      if (status === 200) {
        setSignupStatus(API_STATUS.LOADING);
        setToken(data.token);
        navigate(state?.from ? state.from : "/");
        localStorage?.setItem("login", JSON.stringify({ token: data.token }));
      }
    } catch (error) {
      setSignupStatus(API_STATUS.ERROR);
      setErrorMessage(error.response.data.errorMessage);
    }
  };

  return { login, signUp, loginStatus, signupStatus, errorMessage };
};