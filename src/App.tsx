import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/config/configStore';
import { Router } from './shared/Router';
import { Reset } from 'styled-reset'

function App() {
  return (
    <div>
        <Reset />
      <Provider store={store}>
        <Router />
      </Provider>
    </div>
  );
}

export default App;
