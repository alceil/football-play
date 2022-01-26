import { API_STATUS } from "../constants";
import { initialState } from "../contexts/library-context";

export function libraryReducer(state, action) {
  switch (action.type) {
    case "INITIALIZE_LIBRARY_FETCH":
      return {
        ...state,
        status: { ...state.status, fetchLibrary: API_STATUS.LOADING },
      };

    case "SET_LIBRARY":
      return {
        ...state,
        userLibrary: action.payload,
        status: { ...state.status, fetchLibrary: API_STATUS.SUCCESS },
      };

    case "SET_LIBRARY_FETCH_FAILURE":
      return {
        ...state,
        status: { ...state.status, fetchLibrary: API_STATUS.ERROR },
        errorMessage: {
          ...state.errorMessage,
          fetchLibrary: action.payload.errorMessage,
        },
      };

    case "REMOVE_ITEM_FROM_SELECTED_PLAYLIST":
      return {
        ...state,
        selectedCategory: {
          ...state.selectedCategory,
          list: state.selectedCategory.list.filter(
            (item) => item._id !== action.payload
          ),
        },
      };

    case "ADD_LIKED_VIDEOS":
      return {
        ...state,
        likedVideos: action.payload,
      };

    case "INITIALIZE_LIKE_STATUS":
      return {
        ...state,
        status: { ...state.status, like: API_STATUS.LOADING },
      };

    case "APPEND_ITEM_TO_LIKED_VIDEOS":
      return {
        ...state,
        userLibrary: {
          ...state.userLibrary,
          list: state.userLibrary.list.map((item, index) =>
            item._id === action.payload.playlistId
              ? {
                  ...item,
                  list: action.payload.data.list,
                }
              : item
          ),
        },
        status: { ...state.status, like: API_STATUS.SUCCESS },
      };

    case "SET_LIKE_FAILURE":
      return {
        ...state,
        status: { ...state.status, like: API_STATUS.ERROR },
        errorMessage: {
          ...state.errorMessage,
          like: action.payload.errorMessage,
        },
      };

    case "INITIALIZE_UNLIKE_STATUS":
      return {
        ...state,
        status: { ...state.status, unlike: API_STATUS.LOADING },
      };

    case "REMOVE_FROM_LIKED_VIDEOS":
      return {
        ...state,
        userLibrary: {
          ...state.userLibrary,
          list: state.userLibrary.list.map((item, index) =>
            index === 0
              ? {
                  ...item,
                  list: item.list.filter(
                    (item) => item._id !== action.payload._id
                  ),
                }
              : item
          ),
        },
        status: { ...state.status, unlike: API_STATUS.SUCCESS },
      };

    case "SET_UNLIKE_FAILURE":
      return {
        ...state,
        status: { ...state.status, unlike: API_STATUS.ERROR },
        errorMessage: {
          ...state.errorMessage,
          unlike: action.payload.errorMessage,
        },
      };

    case "CREATE_PLAYLIST":
      return {
        ...state,
        userLibrary: state.userLibrary.concat(action.payload),
      };

    case "INITIALIZE_CREATE_PLAYLIST_WITH_VIDEO_STATUS":
      return {
        ...state,
        status: { ...state.status, newPlaylistWithVideo: API_STATUS.LOADING },
      };

    case "CREATE_PLAYLIST_WITH_VIDEO":
      return {
        ...state,
        userLibrary: action.payload,
        status: { ...state.status, newPlaylistWithVideo: API_STATUS.SUCCESS },
      };

    case "SET_CREATE_PLAYLIST_WITH_VIDEO_FAILURE":
      return {
        ...state,
        status: {
          ...state.status,
          newPlaylistWithVideo: API_STATUS.ERROR,
        },
        errorMessage: {
          ...state.errorMessage,
          newPlaylistWithVideo: action.payload.errorMessage,
        },
      };

    case "INITIALIZE_ADD_VIDEO_STATUS":
      return {
        ...state,
        status: { ...state.status, newPlaylistWithVideo: API_STATUS.LOADING },
      };

    case "APPEND_TO_PLAYLIST":
      return {
        ...state,
        userLibrary: {
          ...state.userLibrary,
          list: state.userLibrary.list.map((item, index) =>
            item._id === action.payload.playlistId
              ? {
                  ...item,
                  list: action.payload.data.list,
                }
              : item
          ),
        },
        status: { ...state.status, addVideoToPlaylist: API_STATUS.SUCCESS },
      };

    case "SET_ADD_VIDEO_FAILURE":
      return {
        ...state,
        status: { ...state.status, addVideoToPlaylist: API_STATUS.ERROR },
        errorMessage: {
          ...state.errorMessage,
          addVideoToPlaylist: action.payload.errorMessage,
        },
      };

    case "INITIALIZE_DELETE_VIDEO_STATUS":
      return {
        ...state,
        status: {
          ...state.status,
          deleteVideoFromPlaylist: API_STATUS.LOADING,
        },
      };

    case "REMOVE_ITEM_FROM_PLAYLIST":
      return {
        ...state,
        userLibrary: {
          ...state.userLibrary,
          list: state.userLibrary.list.map((item, index) =>
            item._id === action.payload.playlistId
              ? {
                  ...item,
                  list: item.list.filter(
                    (item) => item._id !== action.payload.videoId
                  ),
                }
              : item
          ),
        },
        status: {
          ...state.status,
          deleteVideoFromPlaylist: API_STATUS.SUCCESS,
        },
      };

    case "SET_DELETE_VIDEO_FAILURE":
      return {
        ...state,
        status: { ...state.status, deleteVideoFromPlaylist: API_STATUS.ERROR },
        errorMessage: {
          ...state.errorMessage,
          deleteVideoFromPlaylist: action.payload.errorMessage,
        },
      };

    case "INITIALIZE_DELETE_PLAYLIST_STATUS":
      return {
        ...state,
        status: {
          ...state.status,
          deletePlaylist: API_STATUS.LOADING,
        },
      };
    case "DELETE_PLAYLIST":
      return {
        ...state,
        userLibrary: {
          ...state.userLibrary,
          list: state.userLibrary.list.filter(
            (playlistItem) => playlistItem._id !== action.payload.playlistId
          ),
        },
        status: {
          ...state.status,
          deletePlaylist: API_STATUS.SUCCESS,
        },
      };

    case "SET_DELETE_PLAYLIST_FAILURE":
      return {
        ...state,
        status: { ...state.status, deletePlaylist: API_STATUS.ERROR },
        errorMessage: {
          ...state.errorMessage,
          deletePlaylist: action.payload.errorMessage,
        },
      };

    case "RESET":
      return initialState;
      
    default:
      return state;
  }
}