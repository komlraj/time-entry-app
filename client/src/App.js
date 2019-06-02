import React, { useEffect } from 'react';
import {Route,BrowserRouter, Switch, Redirect} from 'react-router-dom';
import { getLoggedinUserData } from './actions/actions';
import { connect } from 'react-redux';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Login from './components/Login';
import Entries from './components/Entries';
import './scss/index.scss';

function App(props) {

  var state = {}

  useEffect(() => {
    state.isCheckingUser =  true;
    fetch('http://localhost:8000/api/isLoggedin')
    .then(res => res.json())
    .then(data => {
      if(data.user) {
        props.dispatch({ type: 'LOGIN_SUCCESS', data: data.user })
      }
      props.getData(data);
      state.isCheckingUser = false;
    })
  });

  // Protected route, if loggedin then render or redirect to '/'
  function checkAuth(renderComponent) {
    if(props.currentUser) {
      return renderComponent;
    } else {
      if (!state.isCheckingUser) {
        return <Redirect to='/login' />
      } else {
        return null;
      }
    }
  }

  function checkLogin() {
    if(props.currentUser) {
      return <Redirect to='/' />
    } else {
      return <Login />
    }
  }
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path='/login' render={() => checkLogin() } />
          <Route path='/register' component={Signup} />
          <Route path='/' render={() => checkAuth(<Dashboard />) } />
          <Route path='/entries' component={Entries} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

function mapStateToProps(state) {
  return {
    currentUser: state ? state.currentUser : state,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getData : (data) => dispatch(getLoggedinUserData(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
