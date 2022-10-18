import { React } from 'react';
import {ContextProvider} from './context/FiuberContext';
import Router from './navigation/Router';

const App = () => {
  return (
      <ContextProvider>
        <Router/>
      </ContextProvider>
    )
}

export default App;
