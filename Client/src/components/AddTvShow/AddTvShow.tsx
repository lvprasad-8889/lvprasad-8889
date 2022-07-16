import { Button } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addTvShow } from "../../store/actions";
import { TvShowsActions } from "../../store/slices";
import "./AddTvShow.css";
const AddTvShow = () => {
  const dispatch = useDispatch<any>();
  let navigate = useNavigate();
  // getting data from store
  const totalShows = useSelector((state: any) => state.TvShows);
  // setting initial values empty
  const [showDetails, setshowDetails] = useState({
    imgLink: "",
    title: "",
    rating: "",
    streamingApp: "",
    review: "",
  });
  const [formFilled, setFormfilled] = useState(false);

  // updates for every key stroke
  const changeshowDetails = (event: any) => {
    let duplicateDetails: any = { ...showDetails };
    duplicateDetails[event.target.name] = event.target.value;
    setshowDetails(duplicateDetails);
  };
  // validating form after submitting
  const submitDetails = async (event: any) => {
    event.preventDefault();
    setFormfilled(true);
    if (
      showDetails.title.trim().length > 0 &&
      showDetails.imgLink.trim().length > 0 &&
      showDetails.streamingApp.trim().length > 0 &&
      parseInt(showDetails.rating) <= 5 &&
      parseInt(showDetails.rating) >= 0 &&
      showDetails.review.trim().split(" ").length > 5
    ) {
      // show name and imagelink are primary keys here, checking show already exists or not
      const showExists = totalShows.find(
        (item: any) =>
          showDetails.title.toLowerCase() === item.title.toLowerCase() ||
          showDetails.imgLink === item.imgLink
      );
      if (showExists) {
        toast.warning("show already exists", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        let username = localStorage.getItem("username");
        let dummyDetails = {
          username,
          tvShowDetails: showDetails,
        };
        try {
          dispatch(TvShowsActions.setProcess({ inProcess: true }));
          let response = await dispatch(addTvShow(dummyDetails));
          // confirmation through toaster based on response
          if (response["payload"]["message"] === "tvshow added successfully") {
            toast.success("Added successfully", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            dispatch(
              TvShowsActions.updateTvShows({
                data: response["payload"]["payload"],
              })
            );
            // making fields empty
            setshowDetails({
              imgLink: "",
              title: "",
              rating: "",
              streamingApp: "",
              review: "",
            });
            setFormfilled(false);
          } else if (
            response["payload"]["message"] === "Unauthorized request" ||
            response["payload"]["message"] ===
              "Session expired..Relogin to continue"
          ) {
            toast.warning("Unauthorized request relogin to continue", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            dispatch(TvShowsActions.setLoggedIn({ loggedIn: false }));
            navigate("/login");
          }
        } catch (err) {
          // error handling
          toast.error("Adding show failed", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          console.log("error in addTvSHow component", err);
        } finally {
          // setting loader false and executes, even promise either resolved or rejected
          dispatch(TvShowsActions.setProcess({ inProcess: false }));
        }
      }
    }
  };
  return (
    <div className="">
      <div className="mb-3">
        <div className="card alignAddshow mb-3">
          <div className="">
            <h1 className=" text-center mb-3">Add New Tv Show</h1>
            <form onSubmit={submitDetails}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Movie name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  placeholder="Enter movie name"
                  value={showDetails.title}
                  onChange={changeshowDetails}
                />
                {formFilled && showDetails.title.trim().length === 0 && (
                  <small className="text-danger">
                    * Movie name is required
                  </small>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="imgLink" className="form-label">
                  Image link
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="imgLink"
                  name="imgLink"
                  placeholder="Enter the image link of movie"
                  value={showDetails.imgLink}
                  onChange={changeshowDetails}
                />
                {formFilled && showDetails.imgLink.trim().length === 0 && (
                  <small className="text-danger">
                    * Image link is required
                  </small>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="rating" className="form-label">
                  Rating
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="rating"
                  name="rating"
                  placeholder="Enter Rating out of 5"
                  value={showDetails.rating}
                  onChange={changeshowDetails}
                />
                {formFilled && showDetails.rating.trim().length === 0 && (
                  <small className="text-danger">* Rating is required</small>
                )}
                {formFilled && parseInt(showDetails.rating) > 5 && (
                  <small className="text-danger">
                    * Rating should be given out of 5
                  </small>
                )}
                {formFilled && parseInt(showDetails.rating) < 0 && (
                  <small className="text-danger">
                    * Rating cannot be negative
                  </small>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="streamingApp" className="form-label">
                  Streaming app
                </label>
                <select
                  className="form-select"
                  name="streamingApp"
                  onChange={changeshowDetails}
                >
                  <option value="">-- select an option --</option>
                  <option value="hotstar">Hotstar</option>
                  <option value="prime">Amazon prime</option>
                  <option value="netflix">Netflix</option>
                </select>
                {formFilled && showDetails.streamingApp.trim().length === 0 && (
                  <small className="text-danger">* App name is required</small>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="review" className="form-label">
                  Review
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="review"
                  name="review"
                  placeholder="Give feedback"
                  value={showDetails.review}
                  onChange={changeshowDetails}
                />
                {formFilled && showDetails.review.trim().length === 0 && (
                  <small className="text-danger">* Review is required</small>
                )}
                {formFilled &&
                  showDetails.review.trim().length !== 0 &&
                  showDetails.review.trim().split(" ").length >= 0 &&
                  showDetails.review.trim().split(" ").length <= 5 && (
                    <small className="text-danger">
                      * Review should contain atleast 6 words
                    </small>
                  )}
              </div>
              <div className="d-flex justify-content-end mt-2">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={submitDetails}
                  type="submit"
                >
                  Add Tv Show
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTvShow;
