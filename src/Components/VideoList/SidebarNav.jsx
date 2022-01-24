import { RemoveButton } from "../RemoveButton";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserActionAPI } from "../../hooks/useUserActionAPI";

export function SideBarNav({ isUserPlayList, selectedList, setSelectedList }) {
  const { videoId } = useParams();
  const { deleteVideoFromPlaylist } = useUserActionAPI();
  const [selectedItemId, setSelectedItemId] = useState(videoId);
  const navigate = useNavigate();

  const removeItem = (event, videoId) => {
    event.stopPropagation();
    deleteVideoFromPlaylist({
      videoId,
      playlistId: selectedList._id,
      playlistName: selectedList.name,
      setSelectedList,
    });
  };

  const navigateOnClick = (_id) => {
    setSelectedItemId(_id);
    navigate(`/${isUserPlayList}/${selectedList._id}/${_id}`);
  };

  useEffect(() => {
    setSelectedItemId(videoId);
  }, [videoId]);

  return (
    <nav>
      {selectedList.list.map(({ _id, youtubeId, name, channelName }) => (
        <div
          key={_id}
          className={
            selectedItemId === _id
              ? "flex-horizontal bg-gray sidebar-item cursor-pointer"
              : "flex-horizontal sidebar-item  cursor-pointer"
          }
          onClick={() => {
            navigateOnClick(_id);
          }}
        >
          <div className="margin-right">
            <img
              src={`https://img.youtube.com/vi/${youtubeId}/0.jpg`}
              alt="img"
              width="120"
            />
          </div>
          <div className="flex-horizontal space-between center-align full-width">
            <div className="font-bold-1 font-size-6 ">
              <div className="font-bold-1 font-size-6">{name}</div>
              <div className="font-bold-1 font-size-6 text-gray">
                {channelName}
              </div>
            </div>
            {isUserPlayList === "playlist" && (
              <RemoveButton id={_id} removeItem={removeItem} />
            )}
          </div>
        </div>
      ))}
    </nav>
  );
}