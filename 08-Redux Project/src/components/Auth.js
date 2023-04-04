import { useSelector, useDispatch } from 'react-redux';

import { authActions } from '../store/index';
import classes from './Auth.module.css';

const Auth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const loginHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.login());
  };

  const formContent = (
    <section>
      <form onSubmit={loginHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' />
        </div>
        <button>Login</button>
      </form>
    </section>
  );

  return (
    <main className={classes.auth}>{!isAuthenticated && formContent}</main>
  );
};

export default Auth;
