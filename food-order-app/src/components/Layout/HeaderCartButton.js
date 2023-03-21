import React, { useContext, useEffect, useState } from 'react';

import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {
  const cart = useContext(CartContext);
  const { items } = cart;

  const cartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const [btnIsBig, setBtnIsBig] = useState(false);
  const btnClasses = `${classes.button} ${btnIsBig ? classes.bump : ''}`;

  useEffect(() => {
    if (cart.items.length === 0) {
      return;
    }
    setBtnIsBig(true);

    const timer = setTimeout(() => {
      setBtnIsBig(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
