import { API_STATUS } from "../constants";
export function categoryReducer(state, action) {
  switch (action.type) {
    case "INITIALIZE_CATEGORIES_FETCH":
      return {
        ...state,
        status: API_STATUS.LOADING,
      };

    case "SET_CATEGORIES":
      return {
        ...state,
        status: API_STATUS.SUCCESS,
        categoriesWithoutVideoDetails: action.payload.categories,
      };

    case "SET_ERROR_MESSAGE":
      return {
        ...state,
        status: API_STATUS.ERROR,
        errorMessage: action.payload.errorMessage,
      };

    case "RESET":
      return {
        categoriesWithoutVideoDetails: [],
        status: API_STATUS.IDLE,
        errorMessage: "",
      };
    default:
      return state;
  }
}