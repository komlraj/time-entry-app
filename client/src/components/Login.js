import React, {useEffect} from 'react';
import '../scss/index.scss';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { loginAction } from '../actions/actions';

function Login(props) {

  var state = {
    username: '',
    password: ''
  }

  function handleChange(e) {
    state[e.target.name] = e.target.value;
  }

  function handleLogin(e) {
    e.preventDefault();
    props.login(state).then(data => {
      if(data.user) {
        props.dispatch({type: 'LOGIN_SUCCESS', data: data.user })
        props.history.push("/");
      } else {
        props.dispatch({ type: 'LOGIN_ERR', data })
      }    
    });
  
  }

  return (
    <div className='login'> 
      <div className='wr-form'>
        <form className='en-form'>
          <h2 className='title'>LOGIN HERE</h2>
          <input type='text' name='username' onChange={handleChange} placeholder='UserName' />
          <input type='password' name='password' onChange={handleChange} placeholder='Password' />
          <button className='btn' onClick={handleLogin}>Login</button>
          <p className='lg-link'>
            Create an account ?  
            <a className='link' href='/register'> Create here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    login : (data) => dispatch(loginAction(data)),
    // getData : (data) => dispatch(getLoggedinUserData(data)),
  }
}

export default connect(null, mapDispatchToProps)(Login);