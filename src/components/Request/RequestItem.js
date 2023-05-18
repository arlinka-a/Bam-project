import React from 'react';
import classes from './RequestItem.module.css';
import Card from '../UI/Card';
import DateReq from '../UI/DateReq';

// {title, amount, date} = props
const RequestItem = (props) => {
  const confirm = props.confirmed;

  return (
    <li>
    <Card>
      <div className={classes.requestItem}>
        <div className={classes.description}>
        <h3>{props.title}</h3>
        {props.description}
        </div> 
        <div>
        <p>{confirm}</p>
        <DateReq date={props.date}/>
        </div>
      </div>
    </Card>
    </li>
  );
}

export default RequestItem;