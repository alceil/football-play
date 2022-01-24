export function LibraryItemOverlay({ categoryItem }) {
    return (
      <div className="card-icon-topRight full-height white-color item-overlay">
        <div className="flex-column center-align-ver-hor center-page-align">
          <div>{categoryItem.list.length}</div>
          <div>
            <span className="material-icons-outlined icon-size-30">
              playlist_play
            </span>
          </div>
        </div>
      </div>
    );
  }