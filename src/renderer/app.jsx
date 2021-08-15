import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Application from "./Application";

// Create main element
const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

export const App = () => {
  return (
    <Application />
  );
}

// Render components
const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    mainElement
  );
};

render(App);
