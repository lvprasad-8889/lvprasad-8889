import { Box, Button, CircularProgress, Modal } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteTvShow } from "../../store/actions";
import { TvShowInterface, TvShowsActions } from "../../store/slices";
import { Rating } from "@mui/material";
import Content from "../Content/Content";
const Card = (props: { item: TvShowInterface }) => {
  // fetching data from store
  let inProcess = useSelector((state: any) => state.inProcess);
  let dispatch = useDispatch<any>();
  const [itemId, setitemId] = useState("");
  const [open, setopen] = useState(false);
  let navigate = useNavigate();
  // function to delete Tv show
  const deleteTvShowOfUser = async (item_id: string) => {
    let username = localStorage.getItem("username");
    let data = {
      username,
      tvShowDetails: {
        _id: itemId,
      },
    };
    try {
      dispatch(TvShowsActions.setProcess({ inProcess: true }));
      let response = await dispatch(deleteTvShow(data));
      // confirmation through toaster based on response
      if (response["payload"]["message"] === "deleted successfully") {
        toast.success("deleted successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        dispatch(
          TvShowsActions.updateTvShows({ data: response["payload"]["payload"] })
        );
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
      toast.error("deletion failed", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.log("error in deleting card", err);
    } finally {
      dispatch(TvShowsActions.setProcess({ inProcess: false }));
      setopen(false);
    }
  };
  // confirmation from user
  const confirmationFromUser = () => {
    deleteTvShowOfUser(itemId);
  };
  // In case if the image link entered is wrong then this is handled
  const setImg = (e: any) => {
    let noImg =
      "https://prescotthobbies.com/wp-content/uploads/2019/11/image-not-available-684f2d57b8fb401a6846574ad4d7173be03aab64aac30c989eba8688ad9bfa05-127.png";
    e.target.onError = null;
    e.target.src = noImg;
  };
  return (
    <div className="card styleCard text-center">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={props.item.imgLink}
            className="styleImage card-img"
            onErrorCapture={setImg}
            alt="loading..."
          />
        </div>
        <div className="col-md-8 ">
          <div className="p-3">
            <div className="d-flex justify-content-between align-items-center">
              <div className="card-title text-capitalize mt-3">
                <h5
                  className="fw-bold globalColor"
                  style={{ fontSize: "25px" }}
                >
                  {props.item.title}{" "}
                </h5>
              </div>
              <div className="dd">
                <Rating
                  sx={{
                    "& .MuiRating-iconFilled": {
                      color: "#1976d2",
                    },
                    "& .MuiRating-icon": {
                      color: "#1976d2",
                    },
                  }}
                  name="half-rating-read"
                  precision={0.1}
                  value={props.item.rating}
                  readOnly
                />
                <div className="text-center">
                  <div className="globalColor">
                    <span className="fw-bold">{props.item.rating}</span>
                    <span className="styleFont">/5</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-text d-flex fw-bold text-capitalize mt-2 gap-2">
              <div style={{ fontSize: "25px" }}>In</div>
              <div className="globalColor" style={{ fontSize: "25px" }}>
                {" "}
                {props.item.streamingApp}
              </div>
            </div>
            <div className="card-text text-start mt-2">
              <Content numberOfWords={13} word={props.item.review} />
            </div>

            <div className="d-flex justify-content-end mt-5 gap-3">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  navigate(`/edit-tv-show/${props.item._id}`);
                }}
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  setopen(true);
                  setitemId(props.item._id);
                }}
                variant="contained"
                color="error"
              >
                Delete
              </Button>
            </div>
          </div>
          <div />
        </div>
        {/* confirmation from user by showing a modal */}
        <Modal
          open={open}
          onClose={() => setopen(false)}
          className="d-flex justify-content-center align-items-center"
        >
          <Box>
            <div className="bg-white rounded p-3">
              <div className="">
                <h4>Do you want to delete Tv Show?</h4>
                <div className="d-flex justify-content-end gap-3 mt-4 mb-2">
                  {inProcess && <CircularProgress />}
                  {!inProcess && (
                    <Button
                      onClick={confirmationFromUser}
                      variant="contained"
                      color="error"
                    >
                      Yes
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      setopen(false);
                    }}
                    variant="contained"
                  >
                    No
                  </Button>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Card;
