import { createContext, useContext, useReducer } from "react";
import { API_STATUS } from "../constants";
import { libraryReducer } from "../reducers/libraryReducer";
const LibraryContext = createContext();

export const initialState = {
  userLibrary: {},
  status: {
    fetchLibrary: API_STATUS.IDLE,
    like: API_STATUS.IDLE,
    unlike: API_STATUS.IDLE,
    deleteVideoFromPlaylist: API_STATUS.IDLE,
    addVideoToPlaylist: API_STATUS.IDLE,
    newPlaylistWithVideo: API_STATUS.IDLE,
    deletePlaylist: API_STATUS.IDLE,
  },
  errorMessage: {
    fetchLibrary: "",
    like: "",
    unlike: "",
    deleteVideoFromPlaylist: "",
    addVideoToPlaylist: "",
    newPlaylistVideo: "",
    deletePlaylist: "",
  },
};

export function LibraryProvider({ children }) {
  const [state, dispatch] = useReducer(libraryReducer, initialState);

  return (
    <LibraryContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibraryContext() {
  return useContext(LibraryContext);
}