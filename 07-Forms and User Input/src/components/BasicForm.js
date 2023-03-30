import useInput from '../hooks/use-input';

const BasicForm = (props) => {
  //first name
  const {
    value: inFirst,
    isValid: firstIsValid,
    hasError: firstHasError,
    valueChangeHandler: firstChangeHandler,
    inputBlurHandler: firstBlurHandler,
    reset: resetFirstName,
  } = useInput((value) => value.trim() !== '');

  //last name
  const {
    value: inLast,
    isValid: lastIsValid,
    hasError: lastHasError,
    valueChangeHandler: lastChangeHandler,
    inputBlurHandler: lastBlurHandler,
    reset: resetLastName,
  } = useInput((value) => value.trim() !== '');

  //email
  const {
    value: inEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => value.includes('@'));

  const firstClasses = firstHasError ? 'form-control invalid' : 'form-control';
  const lastClasses = lastHasError ? 'form-control invalid' : 'form-control';
  const emailClasses = emailHasError ? 'form-control invalid' : 'form-control';

  let formIsValid = false;

  if (firstIsValid && lastIsValid && emailIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (firstHasError || lastHasError || emailHasError) {
      return;
    }

    resetFirstName();
    resetLastName();
    resetEmail();
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className='control-group'>
        <div className={firstClasses}>
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            id='firstName'
            value={inFirst}
            onChange={firstChangeHandler}
            onBlur={firstBlurHandler}
          />
          {firstHasError && (
            <p className='error-text'>First name must not be empty.</p>
          )}
        </div>
        <div className={lastClasses}>
          <label htmlFor='lastName'>Last Name</label>
          <input
            type='text'
            id='lastName'
            value={inLast}
            onChange={lastChangeHandler}
            onBlur={lastBlurHandler}
          />
          {lastHasError && (
            <p className='error-text'>Last name must not be empty.</p>
          )}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor='email'>E-Mail Address</label>
        <input
          type='email'
          id='email'
          value={inEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError && (
          <p className='error-text'>Email must contain a '@' symbol.</p>
        )}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
