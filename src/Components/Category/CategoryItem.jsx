import { useNavigate } from "react-router-dom";

export function CategoryItem({ categoryItem }) {
  const navigate = useNavigate();

  return (
    <div
      className="card card-shadow card-vertical cursor-pointer"
      onClick={() => {
        navigate(`/categories/${categoryItem._id}/${categoryItem.list[0]._id}`);
      }}
    >
      <div>
        <img
          className="card-img"
          src={categoryItem.thumbnail}
          alt="video-img"
        />
      </div>
      <div className="card-content-padding flex-horizontal space-between flex-dir">
        <div className="card-title font-size-5 flex flex-column ">
          <div className="font-bold-1">{categoryItem.name}</div>
          <div className="text-gray">{categoryItem.level}</div>
        </div>
        <div className="card-text font-size-5 ">
          {categoryItem.list.length} Videos{" "}
        </div>
      </div>
    </div>
  );
}