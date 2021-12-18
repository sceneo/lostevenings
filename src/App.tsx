import React from 'react';
import './App.css';
import {GlobalStateProvider} from "./state/GlobalStateProvider";
import TimeTillLostEvenings from "./components/TimeTillLostEvenings";

function App() {
  return (
      <GlobalStateProvider>
        <TimeTillLostEvenings/>
      </GlobalStateProvider>
  );
}

export default App;
