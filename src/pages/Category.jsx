import { useCategoryContext } from "../contexts/category-context";
import { CategoryItem } from "../Components/Category/CategoryItem";
import { useEffect } from "react";
import { API_STATUS, API_URL } from "../constants";
import axios from "axios";

export function Category() {
  const { state, dispatch } = useCategoryContext();

  useEffect(() => {
    (async function () {
      if (state.status === API_STATUS.IDLE) {
        try {
          dispatch({ type: "INITIALIZE_CATEGORIES_FETCH" });

          const { data, status } = await axios.get(`${API_URL}/categories`);

          if (status === 200) {
            dispatch({
              type: "SET_CATEGORIES",
              payload: { categories: data.categories },
            });
          }
        } catch (error) {
          dispatch({ type: "SET_ERROR_MESSAGE" });
        }
      }
    })();
  }, [dispatch, state.status]);

  if (state.status === API_STATUS.LOADING || state.status === API_STATUS.IDLE) {
    return <div className="loader center-page-align" />;
  }

  return (
    <div className="grid-wrapper margin-right">
      <div className="grid-col-3 ">
        {state.categoriesWithoutVideoDetails?.map(
          ({ _id, ...categoryItem }) => {
            return (
              <CategoryItem
                key={_id}
                categoryItem={{ ...categoryItem, _id }}
                isUserPlayList={false}
              />
            );
          }
        )}
      </div>
    </div>
  );
}