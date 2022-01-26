import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useForms } from "../hooks/useForms";
import { useAuthAPI } from "../hooks/useAuthAPI";
import { API_STATUS } from "../constants";

export function SignUp() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const { signUp, signupStatus, errorMessage } = useAuthAPI();
  const location = useLocation();

  const {
    touchedFields,
    handleOnChange,
    handleOnBlur,
    validateSignUp,
    isBtnDisabled,
  } = useForms(setUserDetails);

  function handleSignUp(e) {
    e.preventDefault();

    signUp(userDetails, location.state);
  }
  const errors = validateSignUp(
    userDetails.firstName,
    userDetails.lastName,
    userDetails.email,
    userDetails.password
  );

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
        onSubmit={handleSignUp}
        className=" border-all gray-border padding-all"
        noValidate
      >
        <div className="font-size-3 margin-bottom text-center">Sign Up</div>
        <div className="flex-column margin-bottom">
          <label className="font-size-6 font-bold-1">First Name</label>
          <input
            type="text"
            className={getInputClassName("firstName")}
            onChange={handleOnChange("firstName")}
            onBlur={() => handleOnBlur("firstName")}
          />
          {shouldShowErrors("firstName") && (
            <InputError error={errors.firstName} />
          )}
        </div>

        <div className="flex-column margin-bottom">
          <label className="font-size-6 font-bold-1">Last Name</label>
          <input
            type="text"
            className={getInputClassName("lastName")}
            onChange={handleOnChange("lastName")}
            onBlur={() => handleOnBlur("lastName")}
          />
          {shouldShowErrors("lastName") && (
            <InputError error={errors.lastName} />
          )}
        </div>
        <div className="flex-column margin-bottom">
          <label className="font-size-6 font-bold-1">Email</label>
          <input
            type="email"
            className={getInputClassName("email")}
            required
            onChange={handleOnChange("email")}
            onBlur={() => handleOnBlur("email")}
          />
          {shouldShowErrors("email") && <InputError error={errors.email} />}
        </div>
        <div className="flex-column margin-bottom">
          <label className="font-size-6 font-bold-1">Password</label>
          <input
            type="password"
            className={getInputClassName("password")}
            required
            onChange={handleOnChange("password")}
            onBlur={() => handleOnBlur("password")}
          />
          {shouldShowErrors("password") && (
            <InputError error={errors.password} />
          )}
        </div>
        <div>
          <button
            className="btn btn-primary-contained full-width font-size-5"
            type="submit"
            disabled={isBtnDisabled(errors)}
          >
            SIGN UP
          </button>
        </div>
        <div className="margin-top text-center font-size-6">
          Already have an account?
          <span
            className="text-color-primary font-bold-1 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </form>
      {signupStatus === API_STATUS.LOADING && (
        <div className="margin-top flex flex-col">
          <div className="loader margin-auto" />
        </div>
      )}
      {signupStatus === API_STATUS.ERROR && (
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