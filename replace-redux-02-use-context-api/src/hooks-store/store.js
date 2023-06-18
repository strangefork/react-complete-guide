import { useState, useEffect } from 'react';

let globalState = {}; //This is created once! Not recreated when the hook is instantiated.
let listeners = [];
let actions = {};

export const useStore = () => {
  const setState = useState(globalState)[1]; //This is how you pull only the update function.

  const dispatch = (actionId, payload) => {
    const newState = actions[actionId](globalState, payload);
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  };

  useEffect(() => {
    listeners.push(setState);

    //Clean up listeners when the component unmounts.
    return () => {
      listeners = listeners.filter((li) => li != setState); //Filter out the setState variable that was added when the component is mounted.
    };
  }, []);

  return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }

  actions = { ...actions, ...userActions };
};
