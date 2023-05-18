import { Link } from 'react-router-dom';
import classes from './Dropdown.module.css';

const Dropdown = (props) => {

  return (
    <ul>
          <div className={classes.main}>
          <li><Link to='/myRequests'>סוגי בקשות</Link></li>
          <div className={classes.dropdown}>
          <li><Link to='/myRequests/blackFile'>השחרה</Link></li>
          <li><Link to='/myRequests/validationEntery'>אישור כניסה</Link></li>
          <li><Link to='/myRequests/signShos'>חתימת שוס</Link></li>
          <li><Link to='/myRequests/encodingCard'>קידוד חוגר</Link></li>
          </div>
      </div>
        </ul>
  );
};

export default Dropdown;