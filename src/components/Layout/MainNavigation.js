import { Link, useHistory } from "react-router-dom";
import { useContext } from 'react';
import classes from "./MainNavigation.module.css";
import AuthContext from "../../context/auth-context"; 
import Dropdown from "./Dropdown";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  // authCtx = useContext  ==> authCtx.isManager ? <ManageRequests/> : ''

  const logoutHandler = () => {
    authCtx.logout(); 
    history.push('/');
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>מדור בטחון מידע</div>
      </Link>
      <nav>
        <ul>
          {!authCtx.isLoggedIn && (
            <li>
              <Link to="/auth">התחברות</Link>
            </li>
          )}
          {authCtx.isLoggedIn && (
            <li>
              <Link to="/profile">פרופיל</Link>
            </li>
          )}
          {authCtx.isLoggedIn && (
            <li>
              <Link to="/myRequests">אזור אישי</Link>
            </li>
          )}
          {authCtx.isLoggedIn && (
            <li>
              <Dropdown />
            </li>
          )}
          {authCtx.isManager && (
          <li>
            <Link to="/manageRequests">ניהול בקשות</Link>
          </li>
          )}
          {authCtx.isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>התנתקות</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
