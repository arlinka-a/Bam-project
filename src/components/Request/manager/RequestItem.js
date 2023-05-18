import React from 'react';
import classes from './RequestItem.module.css';
import Card from '../../UI/Card';
import DateReq from '../../UI/DateReq'
import UpdateRequest from '../manager/UpdateRequest'

const RequestItem = (props) => {
  const confirm = props.confirmed;
  const owner = `id: ${props.owner}`;

  return (
    <li>
    <Card>
      <div className={classes.requestItem}>
        <div className={classes.description}>
        <h3>{props.title}</h3>
        {props.description}
        <p>{owner}</p>
        </div> 
        <div className={classes.desSec}>
        <p>{confirm}</p>
        <DateReq date={props.date}/>
        {confirm === 'ממתין לאישור' ? (<UpdateRequest id={props.id}/>) : ''}
        </div>
      </div>
    </Card>
    </li>
  );
}

export default RequestItem;