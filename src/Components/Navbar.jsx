import { Link } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import { useLibraryContext } from "../contexts/library-context";

export function Navbar() {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  const { dispatch } = useLibraryContext();

  const logout = () => {
    setToken(null);
    localStorage?.removeItem("login");
    dispatch({ type: "RESET" });
    navigate("/");
  };

  return (
    <div className="nav navbar-height fixed ">
      <Link
        className="font-size-3 anchor-link text-color-primary cursor-pointer "
        to="/categories"
      >
        <div className="font-size-3 text-color-primary margin-left">
          Dhrutham Play
        </div>
      </Link>
      <div className="nav-list margin-right">
        {!token ? (
          <button
            onClick={() => {
              navigate("/login");
            }}
            className=" nav-item anchor-link margin-right border-all curson-pointer padding-small btn-primary-contained white-color"
          >
            {" "}
            Login
          </button>
        ) : (
          <div
            className="nav-item cursor-pointer margin-right"
            onClick={logout}
          >
            <span className="material-icons-outlined">logout</span>
          </div>
        )}
        <Link className=" nav-item anchor-link" to="/library">
          <span className="material-icons-outlined ">video_library</span>
        </Link>
      </div>
    </div>
  );
}