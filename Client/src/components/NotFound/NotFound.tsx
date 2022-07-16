import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// if page was not found entered by user, confirms this page does not and exisrs
// and navigates to home component of application
const NotFound = () => {
  let navigate = useNavigate();
  return (
    <div>
      <div className="text-danger text-center">Page Not Found</div>
      <div className="d-flex justify-content-center mt-2">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate("/");
          }}
        >
          Return to Home Page
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
