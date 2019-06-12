import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createTaskAction } from "../actions/actions";

function CreateEntry(props) {
  var state = {
    projects: ["project1", "project2", "project3"]
  };

  const initialState = {
    task: "",
    project: "",
    startTime: "",
    endTime: "",
    timer: false,
    timeError: null,
    timerError: null
  };

  const [
    { task, project, startTime, endTime, timer, timeError, timerError },
    setState
  ] = useState(initialState);

  useEffect(() => {
    fetch("http://localhost:8000/api/tasks")
      .then(res => res.json())
      .then(data => {
        props.dispatch({ type: "TASKS", data: data.data });
      });
  });

  function handleState(e) {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  }

  function handleTimer(e) {
    e.preventDefault();
    setState(prevState => ({ ...prevState, ["timer"]: !timer }));
  }

  function checkTime(startTime, endTime) {
    let st = startTime.split(":");
    let et = endTime.split(":");
    let h1 = Number(st[0]);
    let m1 = Number(st[1]);
    let h2 = Number(et[0]);
    let m2 = Number(et[1]);
    if (h2 > h1 || h2 == h1) {
      if (h2 == h1) {
        if (m2 < m1) return { status: 400 };
      }
      return { status: 200, timer: `${h2 - h1}:${m2 - m1}` };
    } else {
      return { status: 400 };
    }
  }

  function handleCreateEntry(e) {
    e.preventDefault();
    let checkTimer = checkTime(startTime, endTime);
    if (checkTimer.status == 200) {
      console.log(checkTimer.timer);
      if (
        (!props.timerData && timer) ||
        (!props.timerData && !timer) ||
        (props.timerData && !timer)
      ) {
        props.dispatch({ type: "LOADER", data: !props.loader });
        props
          .createTask({
            task,
            project,
            startTime,
            endTime,
            timer,
            date: new Date()
          })
          .then(res => {
            setState({ ...initialState });
            props.dispatch({ type: "LOADER", data: false });
          });
      } else {
        setState(prevState => ({
          ...prevState,
          ["timerError"]: "Here you can set One Timer At a time."
        }));
      }
    } else {
      setState(prevState => ({
        ...prevState,
        ["timeError"]: "Please select valid time."
      }));
    }
  }

  return (
    <div className="create-entry">
      <div>
        <form>
          <input
            type="text"
            name="task"
            onChange={handleState}
            placeholder="Task"
          />
          <select name="project" onChange={handleState}>
            <option>Project</option>
            {state.projects.map((project, idx) => {
              return <option key={idx}>{project}</option>;
            })}
          </select>
          <div>
            <span>
              <input
                type="time"
                name="startTime"
                onClick={handleState}
                onChange={handleState}
              />
              <input
                type="time"
                name="endTime"
                onClick={handleState}
                onChange={handleState}
              />
            </span>
            {timeError || timerError ? (
              <label>{timeError || timerError}</label>
            ) : (
              ""
            )}
          </div>
          <button
            className={timer ? "btn stop-btn" : "btn"}
            onClick={handleTimer}
          >
            {timer ? "Stop Timer" : "Start Timer"}
          </button>
          <button className="btn" onClick={handleCreateEntry}>
            Create Entery
          </button>
        </form>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { timerData, tasks } = state;
  return {
    timerData,
    tasks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    createTask: data => dispatch(createTaskAction(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateEntry);
