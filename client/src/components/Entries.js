import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import '../scss/index.scss';

function Entries(props) {

	function getDate(d) {
		var date = new Date(d);
		var year = date.getFullYear();
		var month = date.getMonth();
		var day = date.getDate();
		return `${day}/${month + 1}/${year}`;
	}

	function getTime(d) {
		var date = new Date(d);
		var time = String(date).split(' ')[4];
		return time;
	}

  return (
		<div className='App'>
			<table>
				<thead>
					<tr>
						<td className='sl-n'>Sl. No.</td>
						<td className='td'>Task</td>
						<td className='td'>Project</td>
						<td>Start Time</td>
						<td>End Time</td>
						<td>Create Date</td>
						<td>Create Time</td>
					</tr>
				</thead>
				<tbody>
				{	(props.tasks) ? props.tasks.map((taskObj, i) => {
						const {task, project, startTime, endTime, date} = taskObj;
						return <tr key={i}>
							<td className='sl-n'>{++i}</td>
							<td className='td'>{task}</td>
							<td className='td'>{project}</td>
							<td>{startTime}</td>
							<td>{endTime}</td>
							<td>{getDate(date)}</td>
							<td>{getTime(date)}</td>
						</tr>
					}) : <tr><td>some error</td></tr>
				}
				</tbody>
			</table>
		</div>
	);
}

function mapStateToProps(state) {
  const { tasks } = state;
  return {
    tasks,
  }
}


export default connect(mapStateToProps)(Entries);