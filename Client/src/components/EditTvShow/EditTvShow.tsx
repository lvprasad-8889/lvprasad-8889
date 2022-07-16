import { Button } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateTvShow } from "../../store/actions";
import { TvShowsActions } from "../../store/slices";

const UpdateTvShow = () => {
  const dispatch = useDispatch<any>();
  // getting data from store to initilaise values in input fields
  const totalShows = useSelector((state: any) => state.TvShows);
  // getting params from url
  let param = useParams();
  let tvShow;
  // checking if tv show with Id exist or not
  for (let i = 0; i < totalShows.length; i++) {
    if (totalShows[i]._id === param.id) {
      tvShow = totalShows[i];
      break;
    }
  }
  let tvShowExists = false;
  // if no tvShowExists then setting values empty and tvshowExists false
  if (tvShow === undefined) {
    tvShow = {
      _id: param.id,
      imgLink: "",
      title: "",
      rating: "",
      streamingApp: "",
      review: "",
    };
  } else {
    tvShowExists = true;
  }
  let navigate = useNavigate();
  // if tvShow exists then setting input fields with existing values
  const [showDetails, setshowDetails] = useState({
    _id: tvShow._id,
    imgLink: tvShow.imgLink,
    title: tvShow.title,
    rating: tvShow.rating.toString(),
    streamingApp: tvShow.streamingApp,
    review: tvShow.review,
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
    // if user enters everything according to the condition then request to server
    if (
      showDetails.title.trim().length > 0 &&
      showDetails.imgLink.trim().length > 0 &&
      showDetails.streamingApp.trim().length > 0 &&
      parseInt(showDetails.rating) <= 5 &&
      parseInt(showDetails.rating) >= 0 &&
      showDetails.review.trim().split(" ").length > 5
    ) {
      let username = localStorage.getItem("username");
      let dummyDetails = {
        username,
        tvShowDetails: showDetails,
      };
      try {
        // setting loader as true
        dispatch(TvShowsActions.setProcess({ inProcess: false }));
        let response = await dispatch(updateTvShow(dummyDetails));
        // confirmation through toaster based on response
        if (response["payload"]["message"] === "updated successfully") {
          toast.success("Updated successfully", {
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
          navigate("/tv-shows");
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
        // error handling and informing user through toaster
        toast.error("Updating show failed", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.log("err in edit component", err);
      } finally {
        // setting loader false and executes, even promise either resolves or rejects
        dispatch(TvShowsActions.setProcess({ inProcess: false }));
      }
    }
  };
  return (
    <div className="">
      {tvShowExists && (
        <div className="mb-3">
          <div className="card alignAddshow mb-3">
            <div className="">
              <h1 className=" text-center mb-3">Update Tv Show</h1>
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
                    value={parseInt(showDetails.rating)}
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
                    value={showDetails.streamingApp}
                    onChange={changeshowDetails}
                  >
                    <option value="hotstar">Hotstar</option>
                    <option value="prime">Amazon prime</option>
                    <option value="netflix">Netflix</option>
                  </select>
                  {formFilled &&
                    showDetails.streamingApp.trim().length === 0 && (
                      <small className="text-danger">
                        * App name is required
                      </small>
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
                    Update
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {!tvShowExists && (
        <div className="">
          <div className="text-danger text-center">
            Tv show with id {param.id} does not exist
          </div>
          <div className="d-flex justify-content-center mt-2">
            <Button
              color="primary"
              variant="contained"
              onClick={() => navigate("../")}
            >
              Move to Tv shows
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateTvShow;
