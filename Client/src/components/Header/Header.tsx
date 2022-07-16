import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Header.css";
import { TvShowsActions } from "../../store/slices";
const Header = () => {
  const isLoggedIn: boolean = useSelector((state: any) => state.loggedIn);
  let dispatch = useDispatch();
  // clear data in local storage and set loggedIn false
  const logout = () => {
    localStorage.clear();
    dispatch(TvShowsActions.getTvShows({data:[] ,loggedIn: false }));
  };
  return (
    <div className="mt-1 mb-5">
      <nav className="navbar nav">
        <div className="container d-flex align-items-center">
          {isLoggedIn && (
            <>
              <Link className="navbar-brand globalColor fw-bold" to="/tv-shows">
                TvShows
              </Link>
              <div className="d-flex">
                <Link
                  to=""
                  className="navbar-brand globalColor fw-bold "
                  onClick={logout}
                >
                  LogOut
                </Link>
                <Link
                  to="add-tv-show"
                  className="navbar-brand globalColor fw-bold "
                >
                  AddShow
                </Link>
              </div>
            </>
          )}
          {!isLoggedIn && (
            <>
              <Link className="navbar-brand  text-primary fw-bold" to="/login">
                TvShows
              </Link>
              <Link to="/login" className="navbar-brand text-primary fw-bold ">
                LogIn
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
