import React, { useState, useCallback } from 'react'; //useCallback stores a function across function execution. Makes React.memo work for complex objects.
//Remember! Functions are objects.

import DemoOutput from './components/Demo/DemoOutput';
import Button from './components/UI/Button/Button';

import './App.css';

function App() {
  const [showPara, setShowPara] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);

  console.log('APP RUNNING');

  const toggleParaHandler = useCallback(() => {
    if (allowToggle) {
      //Functions are closures. Variables outside of the function have their values locked in place at function call.
      setShowPara((prevState) => !prevState); //And useCallback locks the allowToggle value in place.
    }
  }, [allowToggle]); //useCallback requires a dependency list like useEffect -- but we do not need to include setShowPara because it already doesn't change.
  //Adding allowToggle to the dep list will recreate toggleParaHandler with the new value.

  const allowToggleHandler = () => {
    setAllowToggle(true);
  };

  return (
    <div className='app'>
      <h1>Hi there!</h1>
      <DemoOutput show={showPara} />
      <Button onClick={allowToggleHandler}>Allow Toggling</Button>
      <Button onClick={toggleParaHandler}>Toggle Paragrah!</Button>
    </div>
  );
}

export default App;
