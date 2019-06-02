import React from 'react';
import '../scss/index.scss';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signupAction } from '../actions/actions';

function Signup(props) {
  var state = {
    name: '',
    username: '',
    email: '',
    password: ''
  }

  function handleChange(e) {
    state[e.target.name] = e.target.value;
  }

  function handleSignup(e) {
    e.preventDefault();
    props.signup(state);
    state = {
      name: '',
      username: '',
      email: '',
      password: ''
    }
  }

  if(props.message) {
    return <Redirect to='/login' /> ;
  } else {
  return (
    <div className='signup'>
      <div className='wr-form'>
        <form className='en-form'>
          <h2 className='title'>CREATE ACCOUNT</h2>
          <input type='text' name='name' onChange={handleChange} placeholder='Full Name' />
          <input type='text' name='username' onChange={handleChange} placeholder='UserName' />
          <input type='gmai' name='email' onChange={handleChange} placeholder='Gmail' />
          <input type='password' name='password' onChange={handleChange} placeholder='Password' />
          <button className='btn' onClick={handleSignup}>Signup</button>
          <p className='lg-link'>
            Have already an account ?  
            <a className='link' href='/login'> Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
  }

}

function mapStateTOProps(state) {
  return {
    message : (state) ? state.signupMessage : null
  }
}

function mapDispatchToProps(dipatch) {
  return {
    signup : (data) => dipatch(signupAction(data))
  }
}

export default connect( mapStateTOProps, mapDispatchToProps)(Signup);