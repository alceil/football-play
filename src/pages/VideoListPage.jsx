import { useLibraryContext } from "../contexts/library-context";
import { Modal } from "../Components/VideoList//Modal";
import { useParams } from "react-router";
import { SideBarNav } from "../Components/VideoList/SidebarNav";
import { ViewVideo } from "../Components/VideoList/ViewVideo";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/auth-context";
import { API_STATUS, API_URL } from "../constants";

export function VideoListPage({ listType }) {
  const { id } = useParams();
  const { videoId } = useParams();
  const { token } = useAuth();
  const { dispatch } = useLibraryContext();
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState(API_STATUS.IDLE);
  const [videoObject, setVideoObject] = useState({});
  const [selectedList, setSelectedList] = useState({});

  useEffect(() => {
    (async function () {
      try {
        setStatus(API_STATUS.LOADING);
        const { data, status } = await axios.get(
          `${API_URL}/${listType}/${id}/${videoId}`,
          {
            headers: {
              authorization: token,
            },
          }
        );

        if (status === 200) {
          setStatus(API_STATUS.SUCCESS);
          setSelectedList(data[listType]);
          setVideoObject(data.video);
        }
      } catch (error) {
        setStatus(API_STATUS.ERROR);
        alert(error);
      }
    })();
  }, [videoId, token, id, dispatch, listType]);

  return (
    <div>
      {status === API_STATUS.LOADING && <span className="loader" />}
      {modal && <Modal videoId={videoId} setModal={setModal} />}
      <div className="grid">
        <main>
          {videoId !== "" && (
            <ViewVideo
              videoObject={videoObject}
              setModal={setModal}
              selectedList={selectedList}
              setSelectedList={setSelectedList}
            />
          )}
        </main>
        {selectedList.list && selectedList.list.length > 0 && (
          <SideBarNav
            isUserPlayList={listType}
            selectedList={selectedList}
            setSelectedList={setSelectedList}
          />
        )}
      </div>
    </div>
  );
}