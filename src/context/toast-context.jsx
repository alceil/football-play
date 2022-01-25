import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState("");

  const hideToast = () => {
    const timerId = setTimeout(() => {
      setToast("");
      clearInterval(timerId);
    }, 2000);
  };
  function showToast(message) {
    setToast(message);
    hideToast();
  }

  return (
    <ToastContext.Provider
      value={{
        toast: toast,
        showToast: showToast,
        hideToast: hideToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};