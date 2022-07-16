import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import AddTvShow from "./components/AddTvShow/AddTvShow";
import EditTvShow from "./components/EditTvShow/EditTvShow";
import Header from "./components/Header/Header";
import LogIn from "./components/LogIn/LogIn";
import TvShows from "./components/TvShows/TvShows";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTvShows } from "./store/actions";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NotFound from "./components/NotFound/NotFound";
import LinearProgress from "@mui/material/LinearProgress";

function App() {
  // setting loader at the top of the navbar to know that the request is being processed
  // getting the data from store
  let inProcess = useSelector((state: any) => state.inProcess);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    // if user credentials exist in localstorage then retrieving data and making loggedIn as true
    if (localStorage.getItem("loggedIn") === "loggedIn") {
      dispatch(fetchUserTvShows());
    }
  }, [dispatch]);
  return (
    <div className="">
      {inProcess && <LinearProgress />}
      <Header />
      <div className="container">
        <Routes>
          {/* Protected route so that user can only enter if user loggined */}
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to="tv-shows" />} />
            <Route path="tv-shows" element={<TvShows />} />
            <Route path="add-tv-show" element={<AddTvShow />} />
            <Route path="edit-tv-show/:id" element={<EditTvShow />} />|
          </Route>
          <Route path="login" element={<LogIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
