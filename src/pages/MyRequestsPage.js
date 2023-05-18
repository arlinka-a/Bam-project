import { useEffect, useState } from "react";
import RequestList from "../components/Request/RequestList";
import axios from "axios";
import LoadingSpinner from '../components/UI/LoadingSpinner';
import classes from './MyRequestsPage.module.css'

const MyRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/requests", {
        params: {
          limit: 50,
        },
      })
      .then((res) => {
        //   setIsLoading(false);
        if (res.error) {
          alert("Failed to load requests");
        } else {
            setIsLoading(false);
          setRequests(res.data);
        }
      });
  }, []);


  return (
    <div className={classes.app}>
    {isLoading && <LoadingSpinner />}
    {!isLoading && <div>
      <RequestList requests={requests} />
    </div>}
    </div>
  );
};

export default MyRequestsPage;
