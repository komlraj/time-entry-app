import React from 'react';
import './scss/index.scss';
import {Route,BrowserRouter, Switch} from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/register' component={Signup} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
