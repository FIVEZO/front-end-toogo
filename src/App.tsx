import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './redux/config/configStore';
import { Router } from './shared/Router';
import { Reset } from 'styled-reset'
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <div>
      <RecoilRoot>
       <ThemeProvider theme={theme}>
        <Reset />
      <Provider store={store}>
        <Router />
      </Provider>
      </ThemeProvider>
      </RecoilRoot>
    </div>
  );
}

export default App;
