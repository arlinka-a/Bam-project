import { useParams, useHistory } from "react-router-dom";
import classes from "./NewRequest.module.css";
import axios from 'axios';
import { useRef, useState } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";

const NewRequest = (props) => {
  const history = useHistory();
  const desInputRef = useRef();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false); 
  
  const kind = params.kind;
  let kindP;
  if (kind === 'encodingCard'){
    kindP = 'קידוד חוגר';
  } else if (kind === 'blackFile'){
    kindP = 'השחרה';
  } else if (kind === 'validationEntery') {
    kindP = 'אישור כניסה';
  } else {
    kindP = 'חתימת שוס';
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredDes = desInputRef.current.value;

    setIsLoading(true);
    axios.post('http://localhost:8080/request', {
        kind: kindP,
        description: enteredDes,
      }).then((res) => {
        setIsLoading(false);
        if (res.error){
          alert('Failed to send request');
        } else {
          alert('Request sent successfully')
          history.replace('/myRequests');
        }
      });
  };

  return (
    <section className={classes.req}>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="request">{kindP}</label>
          <textarea type="text" id="request" required ref={desInputRef}/>
        </div>
        <div className={classes.actions}>
            {!isLoading && <button>שלח בקשה</button>}
            {isLoading && <LoadingSpinner/>}
        </div>
      </form>
    </section>
  );
};

export default NewRequest;
