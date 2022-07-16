import { Navigate, Outlet } from "react-router-dom";

// this is protected route which restricts user to enter other routes
// it confirms through a item in local storage
const ProtectedRoute = () => {
  let loggedIn = localStorage.getItem("loggedIn");
  let isLoggedIn = false;
  if (loggedIn === "loggedIn") {
    isLoggedIn = true;
  }
  return !isLoggedIn ? <Navigate to="/login" /> : <Outlet />;
};

export default ProtectedRoute;
