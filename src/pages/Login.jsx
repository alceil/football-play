import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_STATUS } from "../constants";
import { useForms } from "../hooks/useForms";
import { useAuthAPI } from "../hooks/useAuthAPI";

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [userDetails, setUserDetails] = useState({
    email: "test@test.com",
    password: "test123",
  });
  const { login, loginStatus, errorMessage } = useAuthAPI();
  const {
    touchedFields,
    handleOnChange,
    handleOnBlur,
    validateLogin,
    isBtnDisabled,
  } = useForms(setUserDetails);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(userDetails, location.state);
  };
  const errors = validateLogin(userDetails.email, userDetails.password);

  const shouldShowErrors = (field) => {
    return errors[field] ? touchedFields[field] : false;
  };
  const getInputClassName = (field) => {
    return shouldShowErrors(field)
      ? "text-input error-border-color"
      : "text-input generic-border-color";
  };
  return (
    <div className="center-page-align auth-form">
      <form
        onSubmit={handleSubmit}
        className=" border-all gray-border padding-all"
      >
        <div className="font-size-3 margin-bottom text-center">Login</div>
        <div className="flex-column margin-bottom">
          <label className="font-size-6 font-bold-1">Email</label>
          <input
            type="email"
            className={getInputClassName("email")}
            onChange={handleOnChange("email")}
            value={userDetails.email}
            onBlur={() => handleOnBlur("email")}
          />
          {shouldShowErrors("email") && <InputError error={errors.email} />}
        </div>
        <div className="flex-column margin-bottom">
          <label className="font-size-6 font-bold-1">Password</label>
          <input
            type="password"
            className={getInputClassName("password")}
            onChange={handleOnChange("password")}
            value={userDetails.password}
            onBlur={() => handleOnBlur("password")}
          />
          {shouldShowErrors("password") && (
            <InputError error={errors.password} />
          )}
        </div>
        <div>
          <button
            type="submit"
            disabled={isBtnDisabled(errors)}
            className="btn btn-primary-contained full-width font-size-5"
          >
            LOGIN
          </button>
        </div>
        <div className="margin-top text-center font-size-6">
          Don't have an account?
          <span
            className="text-color-primary font-bold-1 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </div>
      </form>
      {loginStatus === API_STATUS.LOADING && (
        <div className="margin-top flex flex-col">
          <div className="loader margin-auto" />
        </div>
      )}
      {loginStatus === API_STATUS.ERROR && (
        <div className="alert-error margin-top text-center padding-small">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
export const InputError = ({ error }) => {
  return (
    <span role="alert" className="red-color font-size-6">
      {error}
    </span>
  );
};