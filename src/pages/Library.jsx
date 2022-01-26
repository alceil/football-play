import { useLibraryContext } from "../contexts/library-context";
import { LibraryItem } from "../Components/Library/LibraryItem";
import { API_STATUS } from "../constants";

export function Library() {
  const { state } = useLibraryContext();

  const getFetchLibraryStatus = () => {
    return (
      state.status.fetchLibrary === API_STATUS.LOADING ||
      state.status.fetchLibrary === API_STATUS.IDLE
    );
  };

  if (getFetchLibraryStatus()) {
    return <div className="loader center-page-align" />;
  }
  return (
    <div className="grid-wrapper">
      <div className="grid-col-3">
        {state.userLibrary.list?.map((item, index) => {
          return (
            <LibraryItem
              key={item._id}
              categoryItem={item}
              isUserPlayList={index !== 0}
            />
          );
        })}
      </div>
    </div>
  );
}