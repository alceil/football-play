import { useLibraryContext } from "../contexts/library-context";
import { useAuth } from "../contexts/auth-context";
import axios from "axios";
import { API_URL } from "../constants";
import { useToast } from "../contexts/toast-context";

export const useUserActionAPI = () => {
  const { token } = useAuth();
  const { state, dispatch } = useLibraryContext();
  const { showToast } = useToast();

  const likeVideo = async (videoId) => {
    try {
      dispatch({ type: "INITIALIZE_LIKE_STATUS" });
      const { data, status } = await axios.post(
        `${API_URL}/playlist/${state.userLibrary.list[0]._id}`,
        {
          _id: videoId,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (status === 200) {
        dispatch({
          type: "APPEND_ITEM_TO_LIKED_VIDEOS",
          payload: {
            playlistId: state.userLibrary.list[0]._id,
            data: data.updatedList,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: "SET_LIKE_FAILURE",
        errorMessage: "Something went wrong",
      });
      showToast("Something went wrong");
    }
  };

  const unLikeVideo = async (videoId, selectedList, setSelectedList) => {
    try {
      dispatch({ type: "INITIALIZE_UNLIKE_STATUS" });
      const { status } = await axios.delete(
        `${API_URL}/playlist/${state.userLibrary.list[0]._id}/${videoId}`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (status === 200) {
        dispatch({
          type: "REMOVE_FROM_LIKED_VIDEOS",
          payload: { _id: videoId },
        });

        if (selectedList._id === state.userLibrary.list[0]._id) {
          setSelectedList((prevState) => {
            return {
              ...prevState,
              list: prevState.list.filter((video) => video._id !== videoId),
            };
          });
        }
      }
    } catch (error) {
      dispatch({
        type: "SET_UNLIKE_FAILURE",
        errorMessage: "Something went wrong",
      });
      showToast("Something went wrong");
    }
  };

  const addVideoToPlaylist = async (videoId, playlistId, playlistName) => {
    try {
      dispatch({ type: "INITIALIZE_ADD_VIDEO_STATUS" });
      const { data, status } = await axios.post(
        `${API_URL}/playlist/${playlistId}`,
        {
          _id: videoId,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (status === 200) {
        dispatch({
          type: "APPEND_TO_PLAYLIST",
          payload: { playlistId, data: data.updatedList },
        });
        showToast(`Added to ${playlistName} `);
      }
    } catch (error) {
      dispatch({
        type: "SET_ADD_VIDEO_FAILURE",
        errorMessage: "Something went wrong",
      });
      showToast("Something went wrong");
    }
  };

  const deleteVideoFromPlaylist = async ({
    videoId,
    playlistId,
    playlistName,
    setSelectedList,
  }) => {
    try {
      dispatch({ type: "INITIALIZE_DELETE_VIDEO_STATUS" });
      const { status } = await axios.delete(
        `${API_URL}/playlist/${playlistId}/${videoId}`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (status === 200) {
        showToast(`Removed from ${playlistName}`);
        dispatch({
          type: "REMOVE_ITEM_FROM_PLAYLIST",
          payload: {
            playlistId,
            videoId,
          },
        });
        setSelectedList((prevState) => {
          return {
            ...prevState,
            list: prevState.list.filter((video) => video._id !== videoId),
          };
        });
      }
    } catch (error) {
      dispatch({
        type: "SET_DELETE_VIDEO_FAILURE",
        errorMessage: "Something went wrong",
      });
      showToast("Something went wrong");
    }
  };

  const createNewPlaylistAndAddVideo = async (playlistObject) => {
    try {
      dispatch({ type: "INITIALIZE_CREATE_PLAYLIST_WITH_VIDEO_STATUS" });
      const { data, status } = await axios.post(
        `${API_URL}/library`,
        playlistObject,
        {
          headers: {
            authorization: token,
          },
        }
      );
      if (status === 200) {
        dispatch({ type: "CREATE_PLAYLIST_WITH_VIDEO", payload: data.library });
      }
    } catch (error) {
      dispatch({
        type: "SET_CREATE_PLAYLIST_WITH_VIDEO_FAILURE",
        errorMessage: "Something went wrong",
      });
      showToast("Something went wrong");
    }
  };

  const deletePlaylist = async (playlistId, playlistName) => {
    try {
      dispatch({ type: "INITIALIZE_DELETE_PLAYLIST_STATUS" });
      const { status } = await axios.delete(
        `${API_URL}/playlist/${playlistId}`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      if (status === 200) {
        showToast(`Deleted ${playlistName}`);
        dispatch({ type: "DELETE_PLAYLIST", payload: { playlistId } });
      }
    } catch (error) {
      dispatch({
        type: "SET_DELETE_PLAYLIST_FAILURE",
        errorMessage: "Something went wrong",
      });
      showToast("Something went wrong");
    }
  };
  return {
    likeVideo,
    unLikeVideo,
    addVideoToPlaylist,
    deleteVideoFromPlaylist,
    createNewPlaylistAndAddVideo,
    deletePlaylist,
  };
};