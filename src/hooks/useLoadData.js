import { useLibraryContext } from "../contexts/library-context";
import { useAuth } from "../contexts/auth-context";
import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../constants";

export const useLoadData = () => {
  const { token } = useAuth();
  const { dispatch } = useLibraryContext();

  useEffect(() => {
    (async function () {
      if (token) {
        try {
          dispatch({ type: "INITIALIZE_FETCH_LIBRARY" });
          const { data, status } = await axios.get(`${API_URL}/library`, {
            headers: {
              authorization: token,
            },
          });

          if (status === 200) {
            dispatch({ type: "SET_LIBRARY", payload: data.library });
          }
        } catch (error) {
          dispatch({
            type: "LIBRARY_FETCH_FAILURE",
            errorMessage: "Something went wrong.Could not fetch libraries",
          });
        }
      }
    })();
  }, [token, dispatch]);
};