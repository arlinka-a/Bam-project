import classes from "./UpdateRequest.module.css";
import axios from "axios";
import { useHistory } from "react-router-dom";


const UpdateRequest = (props) => {
  const history = useHistory();
  const id = props.id;

  const submitHandler = (value) => {
      const confirmed = value;
      axios
      .patch(`http://localhost:8080/manageRequests/${id}`, { confirmed })
      .then((res) => {
          if (res.error) {
              alert('Please try again');
            } else {
              history.go(0);
          }
        });
  };

  return (
    <>
      <button className={classes.accept} onClick={() => submitHandler("מאושר")}>
        אשר
      </button>
      <button className={classes.deny} onClick={() => submitHandler("סורב")}>
        סרב
      </button>
    </>
  );
};

export default UpdateRequest;
