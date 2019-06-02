import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import '../scss/index.scss';

function Entries(props) {
	var data = null;

	useEffect(() => {
		fetch('http://localhost:8000/api/tasks')
    .then(res => res.json())
    .then(data => {
      props.dispatch({ type: 'TASKS', data: data.data})
    })
	})

  return (
		<div>
			{
				(props.tasks) ? props.tasks.map(obj => {
					<div>
						<p>{obj.task}</p>
						<p>{obj.project}</p>
						<p>{obj.startTime}</p>
					</div>
				}) : <div>some error </div>
			}
		</div>
	);
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Entries);