import RequestItem from "./RequestItem";
import classes from "./RequestList.module.css";

const RequestList = (props) => {
  const requests = props.requests;
  
  return (
    <ul className={classes.requestList}>
      {requests === [] ? <p>עשה בקשה על מנת לראות היסטוריית בקשות</p> : ""}
      {requests.map((request) => (
        <RequestItem
          key={request._id}
          title={request.kind}
          description={request.description}
          confirmed={request.confirmed}
          date={request.createdAt}
        />
      ))}
    </ul>
  );
};

export default RequestList;
