import React from 'react';
import '../scss/index.scss';

function Login() {
  return (
    <div className='login'>
      <div className='wr-form'>
        <form className='en-form'>
          <h2 className='title'>LOGIN HERE</h2>
          <input type='text' placeholder='UserName' />
          <input type='gmai' placeholder='Gmail' />
          <button className='btn'>Login</button>
          <p className='lg-link'>
            Create an account ?  
            <a className='link' href='/register'> Create here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;