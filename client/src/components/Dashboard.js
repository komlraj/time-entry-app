import React from 'react';
import '../scss/index.scss';
import Header from './Header';
import { connect } from 'react-redux';
import Entries from './Entries';
import { createTaskAction } from '../actions/actions';;

function Dashboard(props) {
  var state = {
    projects: ['project1', 'project2', 'project3'],
  }

  function handleTask(e) {
    props.dispatch({type: 'TASK', data:  e.target.value })
  }

  function handleProject(e) {
    props.dispatch({type: 'PROJECT', data:  e.target.value })
  }

  function handleStartTime(e) {
    props.dispatch({type: 'START_TIME', data:  e.target.value })
  }

  function handleEndTime(e) {
    props.dispatch({type: 'END_TIME', data:  e.target.value })
  }

  function handleTimer(e) {
    e.preventDefault();
    props.dispatch({type: 'TIMER', data: !props.timer })  
  }

  function handleClick() {
    props.dispatch({type: 'LOG', data: !props.log })
  }

  function handleCreateEntry(e) {
    e.preventDefault();
    props.dispatch({type: 'LOADER', data: true })
    const { task, project, startTime, endTime, timer } = props;
    props.createTask({
       task,
       project,
       startTime,
       endTime,
       timer,
       date: new Date()
    }).then(res => {
      props.dispatch({type: 'LOADER', data: false });
      props.dispatch({type: 'TIMER', data: false })

    });
  }


  return (
    <div>
      <Header />
      <div className='dashboard'>
        <div className='aside'>
          <div>
            <button  className='btn' onClick={handleClick}>
              {(props.log) ? '<< Back' : 'Browse Entries'}
            </button>
          </div>
          <p>Timer</p>
        </div>
        <div>
          {(props.loader) ? <div>Loader</div> :
            (!props.log) ?  
            <div>
              <form>
                <input type='text' name='task' onChange={handleTask} placeholder='Task'/>
                <select name='project' onChange={handleProject}>
                  <option >Project</option>
                  {
                    state.projects.map((project, idx) => {
                      return <option key={idx}>{project}</option>
                    })
                  }
                </select>
                <input type='time' name='startTime' onClick={handleStartTime} />
                <input type='time' name='endTime' onClick={handleEndTime} />
                <button 
                  className={props.timer ? 'btn stop-btn' : 'btn'}
                  onClick={handleTimer}
                >
                  {(props.timer) ? 'Stop Timer' : 'Start Timer' }
                </button>
                <button className='btn' onClick={handleCreateEntry}>Create Entery</button>
              </form>
            </div> : 
            
                  <Entries />
          }
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    timer: state.timer,
    log: state.log,
    startTime: state.startTime,
    endTime: state.endTime,
    project:  state.project,
    task: state.task,
    loader: state.loader
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    createTask: (data) => dispatch(createTaskAction(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);