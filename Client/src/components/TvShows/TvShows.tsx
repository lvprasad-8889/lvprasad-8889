import { useSelector } from "react-redux";
import "./TvShows.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card";
const TvShows = () => {
  // getting data from store to not show empty shows in this component
  // unless request processed
  let inProcess = useSelector((state: any) => state.inProcess);
  let navigate = useNavigate();
  // getting data from store to display cards
  const userTvShows = useSelector((state: any) => state.TvShows);
  return (
    <div className="mb-5">
      {userTvShows.length > 0 && (
        <div className="row gx-4 gy-4">
          {userTvShows.map((item: any) => (
            <div className="col-xl-6" key={item._id}>
              <Card item={item} />
            </div>
          ))}
        </div>
      )}
      {!inProcess && userTvShows.length === 0 && (
        <div className="">
          <div className="text-center">
            No Tv shows??, no problem you can add Tv shows
          </div>
          <div className="d-flex justify-content-center mt-2">
            <Button
              variant="contained"
              onClick={() => {
                navigate("/add-tv-show");
              }}
            >
              Add Tv Show
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TvShows;
