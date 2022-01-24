import { RemoveButton } from "../RemoveButton";
import { useNavigate } from "react-router-dom";
import { LibraryItemImage } from "./LibraryItemImage";
import { LibraryItemOverlay } from "./LibraryItemOverlay";
import { useUserActionAPI } from "../../hooks/useUserActionAPI";

export function LibraryItem({ categoryItem, isUserPlayList }) {
  const navigate = useNavigate();
  const { deletePlaylist } = useUserActionAPI();

  const removeItem = (event, id) => {
    event.stopPropagation();
    deletePlaylist(id, categoryItem.name);
  };

  const navigateOnSelectingPlaylist = () => {
    if (categoryItem.list?.length > 0) {
      navigate(`/playlist/${categoryItem._id}/${categoryItem.list[0]._id}`);
    }
  };

  return (
    <div>
      <div
        className="card card-shadow card-vertical cursor-pointer"
        onClick={navigateOnSelectingPlaylist}
      >
        <div className="relative-position">
          <LibraryItemImage categoryItem={categoryItem} />
          <LibraryItemOverlay categoryItem={categoryItem} />
        </div>
        <div className="card-content-padding flex-horizontal space-between center-align">
          <div className="card-title font-size-5 ">{categoryItem.name}</div>
          <div>
            {isUserPlayList && (
              <RemoveButton id={categoryItem._id} removeItem={removeItem} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}