import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { PrivateRoute } from "./Components/PrivateRoute";
import { Login } from "./pages/Login";
import { Category } from "./pages/Category";
import { VideoListPage } from "./pages/VideoListPage";
import { Library } from "./pages/Library";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";
import { useToast } from "./contexts/toast-context";
import { Toast } from "./Components/Toast";
import { useLoadData } from "./hooks/useLoadData";

function App() {
  const { toast } = useToast();

  useLoadData();

  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Category />} />
        <PrivateRoute path="/library" element={<Library />} />
        <Route
          path="/categories/:id/:videoId"
          element={<VideoListPage listType={"categories"} />}
        />
        <PrivateRoute
          path="/playlist/:id/:videoId"
          element={<VideoListPage listType={"playlist"} />}
        />
      </Routes>
      {toast !== "" && <Toast message={toast} />}
    </div>
  );
}

export default App;