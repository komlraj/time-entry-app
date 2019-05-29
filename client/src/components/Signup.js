import React from 'react';
import '../scss/index.scss';

function Signup() {
  return (
    <div className='signup'>
      <div className='wr-form'>
        <form className='en-form'>
          <h2 className='title'>CREATE ACCOUNT</h2>
          <input type='text' placeholder='Full Name' />
          <input type='text' placeholder='UserName' />
          <input type='gmai' placeholder='Gmail' />
          <button className='btn'>Signup</button>
          <p className='lg-link'>
            Have already an account ?  
            <a className='link' href='/login'> Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;