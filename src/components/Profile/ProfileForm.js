import classes from './ProfileForm.module.css';
import axios from 'axios';
import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth-context';


const ProfileForm = () => {
  const passwordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredPassword = passwordInputRef.current.value;
    axios.patch(`http://localhost:8080/users/update`, {
      "token": token,
      "password": enteredPassword
    }).then((res) => {
      console.log(res)
      history.push('/')
    });
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>סיסמה חדשה</label>
        <input type='password' id='new-password' minLength='7' ref={passwordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>שנה סיסמה</button>
      </div>
    </form>
  );
}

export default ProfileForm;
