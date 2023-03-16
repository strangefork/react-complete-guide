import React, { useState, useEffect, useReducer, useContext } from 'react';

import AuthContext from '../../store/auth-context';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if(action.type === 'USER_INPUT'){
    return {value: action.val, isValid: action.val.includes('@')};  
  }
  if(action.type === 'INPUT_BLUR'){
    return {value: state.value, isValid: state.value.includes('@')};   //could refactor the isValid check into a function if you want.
  }
  return {value: '', isValid: false};
}; //Created outside of the component because it doesn't need to interact with it. 

const passwordReducer = (state, action) => {
  if(action.type === 'USER_INPUT'){
    return {value: action.val, isValid: action.val.trim().length > 6};  
  }
  if(action.type === 'INPUT_BLUR'){
    return {value: state.value, isValid: state.value.trim().length > 6};  
  }
  return {value: '', isValid: null};
}

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  
  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: null});

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;  //This is object destructuring, and applying an alias.

  const ctx = useContext(AuthContext);


  useEffect(() =>{
    //useEffect is here to handle SIDE effects. Any time an action that should be triggered in response to another action, that is a side effect.
    const id = setTimeout(() => {
      setFormIsValid(
      emailIsValid && passwordIsValid  //This is now okay because useEffect runs AFTER the component finishes it's state updates.
    );
    }, 500);
    return () => {
      clearTimeout(id);  //This clears the previous timer. Only the last timer will finish -- this is effectively a debounce.
    };  //This is a "clean-up" function. It runs before the next iteration of useEffect runs and before the component is removed.
  }, [emailIsValid, passwordIsValid]); //This will trigger the validation code whenever one of these two variables change.

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val: event.target.value});
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogIn(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
