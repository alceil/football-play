import { useUserActionAPI } from "../hooks/useUserActionAPI";

export function PlaylistCheckBox({
  playlistId,
  playlistName,
  playlistVideoList,
  videoId,
  setSelectedList,
}) {
  function isVideoInList(playlistVideoList, videoId) {
    return playlistVideoList.find((item) => item._id === videoId) !== undefined;
  }

  const { addVideoToPlaylist, deleteVideoFromPlaylist } = useUserActionAPI();

  const toggleCheckBox = (event) => {
    if (event.target.checked) {
      addVideoToPlaylist(videoId, playlistId, playlistName);
    } else {
      deleteVideoFromPlaylist({
        videoId,
        playlistId,
        playlistName,
        setSelectedList,
      });
    }
  };
  return (
    <div className="flex-horizontal margin-top cursor-pointer">
      <label className="full-width font-size-5 cursor-pointer" htmlFor={playlistId}>
      <input
        type="checkbox"
        id={playlistId}
        className="margin-right checkbox-size cursor-pointer"
        checked={isVideoInList(playlistVideoList, videoId)}
        onChange={toggleCheckBox}
      />
        {playlistName}
      </label>
    </div>
  );
}