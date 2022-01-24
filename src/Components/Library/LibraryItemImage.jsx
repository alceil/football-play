export function LibraryItemImage({ categoryItem }) {
    return (
      <div>
        <img
          className="card-img"
          src={
            categoryItem.list.length > 0
              ? `https://img.youtube.com/vi/${categoryItem.list[0]?.youtubeId}/0.jpg`
              : `https://i.ytimg.com/img/no_thumbnail.jpg`
          }
          alt="video-img"
        />
      </div>
    );
  }