const redux = require('redux');

const counterReducer = (state = { counter: 0 }, action) => {
  //This = { counter: 0 } will provide a default value.
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
    };
  }

  return state;
};

const store = redux.createStore(counterReducer);

const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

store.subscribe(counterSubscriber); //We pass the function to the store, and that function will get triggered whenever the state changes.

store.dispatch({ type: 'increment' });
store.dispatch({ type: 'decrement' });
