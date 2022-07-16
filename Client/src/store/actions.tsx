import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";
import { Dispatch } from "react";
import { toast } from "react-toastify";
import { TvShowsActions } from "./slices";

const url = "http://localhost:5000";

// fetches user tv shows if user already logged in
export const fetchUserTvShows = (): any => {
  return (dispatch: Dispatch<any>) => {
    dispatch(TvShowsActions.setLoggedIn({loggedIn:true}))
    const fetchData = async () => {
      let username = localStorage.getItem("username");
      let access_token = localStorage.getItem("token");
      try {
        dispatch(TvShowsActions.setProcess({ inProcess: true }));
        let userShows = await Axios.get(`${url}/shows/${username}`, {
          headers: { Authorization: "Bearer " + access_token },
        });
        if (userShows["data"]["message"] === "fecthed shows") {
          dispatch(
            TvShowsActions.getTvShows({
              data: userShows["data"]["payload"],
              loggedIn: true,
            })
          );
          dispatch(TvShowsActions.setProcess({ inProcess: false }));
          toast.success(userShows["data"]["message"], {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (err) {
        toast.error("fetching failed", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.log("error in fetching user shows", err);
      } finally {
        dispatch(TvShowsActions.setProcess({ inProcess: false }));
      }
    };
    fetchData().catch((err) => console.log("error in fetching data", err));
  };
};

// used to check the credentials entered by the user and returning promise
export const checkUserCredentials = createAsyncThunk(
  "checkUser",
  async (userCredentials: object) => {
    try {
      let userExists = await Axios.post(`${url}/login`, userCredentials);
      return userExists.data;
    } catch (err) {
      console.log("error in checking credentials", err);
    }
  }
);

// used to add tv show to database by the user and returning the promise
export const addTvShow = createAsyncThunk(
  "addTvShow",
  async (userTvShowDetails: object) => {
    try {
      let access_token = localStorage.getItem("token");
      let addUserTvShow = await Axios.put(`${url}/addShow`, userTvShowDetails, {
        headers: { Authorization: "Bearer " + access_token },
      });
      return addUserTvShow.data;
    } catch (err) {
      console.log("eror in adding a tv show", err);
    }
  }
);

// used to update tv shows of user and returning the promise
export const updateTvShow = createAsyncThunk(
  "updateTvShow",
  async (userTvShowDetails: object) => {
    try {
      let access_token = localStorage.getItem("token");
      let modilfyUserTvShow = await Axios.put(
        `${url}/updateShow`,
        userTvShowDetails,
        {
          headers: { Authorization: "Bearer " + access_token },
        }
      );
      return modilfyUserTvShow.data;
    } catch (err) {
      console.log("error in updating tv show", err);
    }
  }
);

// used to delete the tv show of a user and returns the promise
export const deleteTvShow = createAsyncThunk(
  "deleteTvShow",
  async (userTvShowDetails: object) => {
    try {
      let access_token = localStorage.getItem("token");
      let deleteUserTvShow = await Axios.delete(`${url}/deleteShow`, {
        headers: { Authorization: "Bearer " + access_token },
        data: userTvShowDetails,
      });
      return deleteUserTvShow.data;
    } catch (err) {
      console.log("error in deleting tvshow", err);
    }
  }
);
