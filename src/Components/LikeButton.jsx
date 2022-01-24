import { useLibraryContext } from "../contexts/library-context";
import { useAuth } from "../contexts/auth-context";
import { useNavigate, useLocation } from "react-router";
import { useUserActionAPI } from "../hooks/useUserActionAPI";

export function LikeButton({ videoId, selectedList, setSelectedList }) {
  const { state } = useLibraryContext();
  const { token } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { likeVideo, unLikeVideo } = useUserActionAPI();

  const isVideoLiked = () => {
    if (state.userLibrary.list && state.userLibrary.list[0]) {
      return (
        state.userLibrary.list[0]?.list.find((item) => item._id === videoId) !==
        undefined
      );
    }
  };

  const onLikeButtonClick = () => {
    token
      ? !isVideoLiked()
        ? likeVideo(videoId, selectedList, setSelectedList)
        : unLikeVideo(videoId, selectedList, setSelectedList)
      : navigate("/login", { state: { from: location.pathname } });
  };

  return (
    <div>
      <button
        onClick={onLikeButtonClick}
        className=" icon-btn btn-box margin-right cursor-pointer"
      >
        <span
          className={
            !isVideoLiked()
              ? "material-icons-outlined icon-color-gray"
              : "material-icons icon-color-primary"
          }
        >
          thumb_up
        </span>
      </button>
    </div>
  );
}