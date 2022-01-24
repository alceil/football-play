import { LikeButton } from "../LikeButton";
import { SaveButton } from "../SaveButton";

export function ViewVideo({
  videoObject,
  setModal,
  selectedList,
  setSelectedList,
}) {
  return (
    <div>
      <div className="video-wrapper">
        <iframe
          src={`https://www.youtube.com/embed/${videoObject.youtubeId}`}
          title="song"
        ></iframe>
      </div>
      <div className="card-horizontal center-align videoElements padding-top">
        <div className="font-size-4 video-title">{videoObject.name}</div>
        <div className="nav-list">
          <LikeButton
            videoId={videoObject._id}
            selectedList={selectedList}
            setSelectedList={setSelectedList}
          />
          <SaveButton
            videoId={videoObject._id}
            setModal={setModal}
            selectedList={selectedList}
            setSelectedList={setSelectedList}
          />
        </div>
      </div>
    </div>
  );
}