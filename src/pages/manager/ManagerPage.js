import { useEffect, useState } from "react";
import RequestList from "../../components/Request/manager/RequestList";
import axios from "axios";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import classes from "./ManagerPage.module.css";
import RequestFilter from "../../components/Request/manager/RequestFilter";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

const ManagerPage = () => {
  const [allRequests, setAllRequests] = useState([]);
  const [openRequests, setOpenRequests] = useState([]);
  const [date, setDate] = useState({start: Date.parse('2023-05-01T12:04:00.207Z'), end:Date.now()});

  const [isLoading, setIsLoading] = useState(true);

  const [filteredKind, setfilteredKind] = useState("השחרה");

  const [visible, setVisible] = useState(3);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/manageRequests`)
      .then((res) => {
        //   setIsLoading(false);
        if (res.error) {
          alert("Failed to load requests");
        } else {
          setIsLoading(false);
          setAllRequests(res.data);
        }
      });
  }, [visible]);

  const filterChangeHandler = (selectedKind) => {
    setfilteredKind(selectedKind);
  };

  const dateChangeHandler = (selectedDate) => {
    const start = Date.parse(selectedDate[0].$d)
    if (selectedDate[1] !== null){
      const end = Date.parse(selectedDate[1].$d)
      setDate({start, end})
    }
  }

  const getNextRequests = () => {
    setVisible(prevValue => prevValue + 3);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/manageRequests/open")
      .then((res) => {
        if (res.error) {
          alert("Failed to load requests");
        } else {
          setIsLoading(false);
          setOpenRequests(res.data);
        }
      });
  }, []);

  const filteredOpenRequests = openRequests.filter((request) => {
    return request.kind === filteredKind;
  });

  const filteredAllRequests = allRequests.filter((request) => {
    const requestDate = Date.parse(request.createdAt);
    return requestDate.valueOf() >= date.start.valueOf() && requestDate.valueOf() <= date.end.valueOf() // true
  });

  return (
    <>
      <div className={classes.app}>
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <div className={classes.con}>
            <h2>כל הבקשות</h2>
            <DateRangePicker onChange={dateChangeHandler} closeOnSelect={true}/>
            {allRequests.length === 0 ? (
              <p>אין בקשות קיימות</p>
            ) : (
              <div>
                <RequestList requests={filteredAllRequests.slice(0, visible)}/>
              </div>
            )}
          </div>
        )}
        {!isLoading && (
          <div className={classes.con}>
            <h2>הבקשות הפתוחות</h2>
            {openRequests.length === 0 ? (
              ""
            ) : (
              <RequestFilter
                selected={filteredKind}
                onChangeFilter={filterChangeHandler}
              />
            )}
            {openRequests.length === 0 ? (
              <p>אין בקשות פתוחות</p>
            ) : (
              <div>
                <RequestList requests={filteredOpenRequests} />
              </div>
            )}
          </div>
        )}
      </div>
      {!isLoading && (
        <div className={classes.actions}>
          <button onClick={getNextRequests}>הצג בקשות נוספות</button>
        </div>
      )}
    </>
  );
};

export default ManagerPage;
