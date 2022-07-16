import { useRef, useState } from "react";
import "./LogIn.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TvShowsActions } from "../../store/slices";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkUserCredentials } from "../../store/actions";
import { Button } from "@mui/material";
const LogIn = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  let dispatch = useDispatch<any>();
  let navigate = useNavigate();
  // validating the data entered and sending request to the server
  const logIn = async (event: any) => {
    event.preventDefault();
    setFormSubmitted(true);
    let userCredentials = {
      username: username.current?.value,
      password: password.current?.value,
    };
    if (
      username.current?.value.trim() !== "" &&
      password.current?.value.trim() !== ""
    ) {
      try {
        dispatch(TvShowsActions.setProcess({ inProcess: true }));
        let userExists = await dispatch(checkUserCredentials(userCredentials));
        // confirmation through toaster based on response
        if (userExists["payload"]["message"] === "login success") {
          localStorage.setItem("loggedIn", "loggedIn");
          localStorage.setItem("token", userExists["payload"]["payload"]);
          localStorage.setItem(
            "username",
            userExists["payload"]["userObj"]["username"]
          );
          dispatch(
            TvShowsActions.getTvShows({
              data: userExists["payload"]["userObj"]["TvShows"],
              loggedIn: true,
            })
          );
          navigate("/tv-shows");
          toast.success("Login successfull", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.error("Invalid username ot password", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (err) {
        // error handling and informing user through toaster
        toast.error("Error in logging in", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.log("err in login component", err);
      } finally {
        // setting loader as false, executes even promise either resolved or rejected
        dispatch(TvShowsActions.setProcess({ inProcess: false }));
      }
    }
  };
  return (
    <div className="row">
      <div className="col-md-8 mx-auto">
        {" "}
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              ref={username}
            />
            {formSubmitted && username.current?.value.length === 0 && (
              <small className="text-danger">Username is required</small>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              ref={password}
            />
            {formSubmitted && password.current?.value.length === 0 && (
              <small className="text-danger">Password is required</small>
            )}
          </div>
          <Button
            type="submit"
            onClick={logIn}
            variant="contained"
            color="primary"
          >
            LogIn
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
