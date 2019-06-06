import React, { useState, useEffect } from 'react';
import '../scss/index.scss';
import Header from './Header';
import { connect } from 'react-redux';
import Entries from './Entries';
import CreateEntry from './CreateEntry';


function Dashboard(props) {

  useEffect(() => {
    fetch('http://localhost:8000/api/timers')
    .then(res => res.json())
    .then(data => {
      props.dispatch({ type : 'TIMER_DATA', data: data.data })
    }).catch(err => {
      props.dispatch({ type : 'TIMER_ERROR', data: err })
    })
  });

  function handleClick() {
    props.dispatch({type: 'LOG', data: !props.log })
  }

  return (
    <div className='app'>
      <Header />
      <div className='dashboard'>
        <div className='aside'>
          <div>
            <button  className='btn' onClick={handleClick}>
              {(props.log) ? '<< Back' : 'Browse Entries'}
            </button>
          </div>
          <p>Timer</p>
          <div>
            {
              (props.timerData) ?
                <div>
                  <p>{props.timerData.task}</p>
                  <p>{props.timerData.startTime}</p>
                  <p>{props.timerData.endTime}</p>
                </div>
              : ''
            }
          </div>
        </div>
        <div className='main'>
          {(props.loader) ? 
          <div class="lds-spinner">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            <div></div><div></div><div></div><div></div>
          </div> :
            (!props.log) ? <CreateEntry /> :
           <Entries />
          }
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    log: state.log,
    loader: state.loader,
    timerData: state.timerData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);