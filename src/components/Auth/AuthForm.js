import { useState, useRef, useContext } from "react";
import classes from "./AuthForm.module.css";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import axios from 'axios';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);  
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    
    setIsLoading(true);
    if (isLogin) {
      axios.post('http://localhost:8080/users/login', {
        email: enteredEmail,
        password: enteredPassword,
      }).then((res) => {
        setIsLoading(false);
        if (res.data === 'Unable to login!' || res.error){
          history.push('/auth');
          alert(res.data);
        } else {
          authCtx.login(res.data.token, res.data.manager);
          history.push('/');
          console.log('logged in user')
        }
      })
    } else {
      axios.post('http://localhost:8080/users/signup', {
        email: enteredEmail,
        password: enteredPassword,
        manager: false,
      }).then((res) => {
        setIsLoading(false);
        if (res.data === 'User already exist' || res.error){
          history.push('/auth');
          alert(res.data);
        } else {
          authCtx.login(res.data.token, false);
          history.push('/');
          console.log('new user')
        }
      });
    }
    // setIsLoading(true); - להחזיר את זה כשמשתמשים בשרת
  };
  
  const changeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "התחברות" : "הרשמה"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">אימייל</label>
          <input type="email" id="email" required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor="password">סיסמה</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? "התחברות" : "הרשמות"}</button>}
          {isLoading && <p>שולח בקשה לשרת...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={changeHandler}
          >
            {isLogin ? "צור חשבון חדש" : "התחבר ממשתמש קיים"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
