import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isNotLongEnough = (value) => value.trim().length !== 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameRef = useRef();
  const streetRef = useRef();
  const postalCodeRef = useRef();
  const cityRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredPostalCode = postalCodeRef.current.value;
    const enteredCity = cityRef.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const cityIsValid = !isEmpty(enteredCity);
    const postalCodeIsValid = !isNotLongEnough(enteredPostalCode);

    setFormInputsValidity({
      name: nameIsValid,
      street: streetIsValid,
      city: cityIsValid,
      postalCode: postalCodeIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && cityIsValid && postalCodeIsValid;

    if (!formIsValid) {
      return;
    }
    //TODO: Submit the cart data
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode
    });
  };



  const nameClasses = `${classes.control} ${
    formInputsValidity.name ? '' : classes.invalid
  }`;

  const streetClasses = `${classes.control} ${
    formInputsValidity.street ? '' : classes.invalid
  }`;

  const cityClasses = `${classes.control} ${
    formInputsValidity.city ? '' : classes.invalid
  }`;

  const postalCodeClasses = `${classes.control} ${
    formInputsValidity.postalCode ? '' : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeRef} />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code (5 characters)!</p>
        )}
      </div>
      <div className={cityClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
