import React, { useState, useEffect } from 'react';
import '../scss/index.scss';
import Header from './Header';
import { connect } from 'react-redux';
import Entries from './Entries';
import CreateEntry from './CreateEntry';


function Dashboard(props) {

  const [ time, setTime ] = useState('null');

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

  function timer(startTime, endTime) {
    var timeR = 'kk';
    var now = new Date();
    var cd =  now.getDate();
    var cm = now.getMonth() + 1;
    var cy = now.getFullYear();
    var countDownDate = new Date(`${cm} ${cd} ${cy} ${endTime}`).getTime();

    var x = setInterval(function() {
      var nowT = now.getTime();
      var distance = countDownDate - nowT;
    
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
      setTime(days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ");
  
    if (distance < 0) {
      clearInterval(x);
      setTime("EXPIRED");
    }
    }, 1000);
  }
  timer("11:11", "03:05");

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
                  <p>{props.timerData.project}</p>
                  {/* <p>{timer(props.timerData.startTime, props.timerData.endTime)}</p> */}
                  <p>{time}</p>
                </div>
              : ''
            }
          </div>
        </div>
        <div className='main'>
          {(props.loader) ? 
          <div className="lds-spinner">
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