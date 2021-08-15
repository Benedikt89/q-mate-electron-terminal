import { hot } from 'react-hot-loader/root';
import React, {useEffect, useState} from 'react';
import config from './config.json';

import Main from "./components/Main";
import logo from './logo.svg';
import {Styles} from './constants/styles';
import Header from "./components/Header";
import {getQuery, parseQuery} from "./constants/queryHelpers";
import Keys from "./constants/appKeys";
import {ThemeProvider, useTheme} from "./constants/theme";

import './constants/i18n';
import MessageComponent from "./components/common/MessageComponent";
import ErrorBoundary from "./components/common/ErrorBoundary";

const defaults = {
  branchId: Keys.REACT_APP_DEFAULT_BRANCH,
  local: Keys.REACT_APP_DEFAULT_LOCALE,
  voice: Keys.REACT_APP_DEFAULT_VOICE
}

function App() {
  const theme = useTheme();
  const s = new Styles(theme);
  const [message, setMessage] = useState('');

  return (
    <div style={{...s.app, margin: '0 auto'}}>
      <Header/>
      {!message && <Main setMessage={setMessage}/>}
      {message && <MessageComponent setMessage={setMessage} message={message}/>}
    </div>
  );
}

function Application() {
  const [theme, setTheme] = useState({
    primaryColor: '#e3bb4d',
    secondaryColor: '#000000',
    backgroundColor: '#FFFFFF',
    secondaryBackground: '#FDFDFD',
    borderColor: '#b5b5b5'
  });

  useEffect(() => {
    const url = window.location.search;
    let newKeys = defaults;
    let newTheme = {...theme};
    if (config.BRANCH_ID) {
      Object.keys(config).forEach(key => {
        if (newTheme[key]) {
          newTheme[key] = config[key];
        }
        newKeys[key] = config[key];
      })
    }
    let keysObj = parseQuery(getQuery(url));
    if (!url || !keysObj.branchId) {
      //window.location.search = stringifyQuery(defaults);
      keysObj = defaults;
    }
    newKeys = {...newKeys, ...keysObj}
    console.log(newKeys)
    Object.keys(newKeys).forEach(key => {
      Keys[key] = newKeys[key];
    })
    setTheme(newTheme)

  }, []);

  return (
    <ErrorBoundary>
      <React.Suspense fallback={
        <div className="App"><img src={logo} className="App-logo" alt="logo"/></div>
      }>
        <ThemeProvider theme={theme} >
          <App/>
        </ThemeProvider>
      </React.Suspense>
    </ErrorBoundary>
  );
}

export default hot(Application);
