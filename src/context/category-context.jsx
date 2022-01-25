import { createContext, useContext, useReducer } from "react";
import { API_STATUS } from "../constants";
import { categoryReducer } from "../reducers/categoryReducer";
const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [state, dispatch] = useReducer(categoryReducer, {
    categoriesWithoutVideoDetails: [],
    status: API_STATUS.IDLE,
    errorMessage: "",
  });

  return (
    <CategoryContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export function useCategoryContext() {
  return useContext(CategoryContext);
}