import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import AuthContext from '../../store/auth-context';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

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

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

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
    if(formIsValid){
      ctx.onLogIn(emailState.value, passwordState.value);
    } else if (!emailIsValid){
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
    
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input ref={emailInputRef} label="E-Mail" type='email' id='email' defaultValue={emailState.value} isValid={emailState.isValid} onChange={emailChangeHandler} onBlur={validateEmailHandler}/>
        <Input ref={passwordInputRef} label="Password" type='password' id='password' defaultValue={passwordState.value} isValid={passwordState.isValid} onChange={passwordChangeHandler} onBlur={validatePasswordHandler}/>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
