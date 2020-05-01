import React from 'react';
import {Route, Switch} from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/homepage.component';

const HatsPage = () =>
(
  <div>
    <h1>Hats Pageee</h1>
  </div>
);

// exact == exact = {true}
// si exact es true, la page no se renderea a menos que la url sea exacta
// cuando un route matchea dentro de un switch, solo se renderea dicho route y nada mas
// solo sirve para mas control
function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/hats' component={HatsPage} />
      </Switch>
    </div>
  );
}

export default App;
