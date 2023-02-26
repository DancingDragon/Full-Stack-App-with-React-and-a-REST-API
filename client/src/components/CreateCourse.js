import React, {createRef} from 'react';
import ReactDOM from 'react-dom';
import {useState, useEffect} from 'react';
import {Consumer} from './Context';
import { withRouter } from "react-router-dom";

function Courses({history}) {

	const [errors, setErrors] = useState([]);
	var courseform = createRef();
	
	return (
		<Consumer>
		{ ({authenticatedUser}) => {
			const createCourse = (e) => {
				e.preventDefault();
				const requestOptions = {
					method: 'POST',
					headers: new Headers({
						'Content-Type': 'application/json',
						'Authorization': 'Basic '+btoa(`${authenticatedUser.emailAddress}:${authenticatedUser.password}`)
					}),
					body: JSON.stringify(Object.fromEntries(new FormData(courseform.current)))
				};
						
				fetch('http://localhost:5000/api/courses/', requestOptions)
				.then(response => {
					if (response.status === 201) {
						history.push('/');
					} else {
						response.json().then(data => {
							setErrors(data.errors);
						})
					}
				})
			}
			
			return(
				<div className="wrap">
				  <h2>Create Course</h2>
				  {
					  errors.length > 0 ? 
						  <div className="validation--errors">
							<h3>Validation Errors</h3>
							<ul>
							{errors.map((e, i)=><li key={i}>{e}</li>)}
							</ul>
						  </div>
					  : ""
				  }
				  <form ref={courseform}>
					<div className="main--flex">
					  <div>
						<label htmlFor="courseTitle">Course Title</label>
						<input
						  id="courseTitle"
						  name="title"
						  type="text"
						  defaultValue=""
						/>
						<p>By Joe Smith</p>
						<label htmlFor="courseDescription">Course Description</label>
						<textarea
						  id="courseDescription"
						  name="description"
						  defaultValue={""}
						/>
					  </div>
					  <div>
						<label htmlFor="estimatedTime">Estimated Time</label>
						<input
						  id="estimatedTime"
						  name="estimatedTime"
						  type="text"
						  defaultValue=""
						/>
						<label htmlFor="materialsNeeded">Materials Needed</label>
						<textarea
						  id="materialsNeeded"
						  name="materialsNeeded"
						  defaultValue={""}
						/>
					  </div>
					</div>
					<button 
						className="button"
						onClick={createCourse}
					>
					  Create Course
					</button>
					<button
					  className="button button-secondary"
					  onClick={()=>history.push('/')}
					>
					  Cancel
					</button>
				  </form>
				</div>
			)
		}}
		</Consumer>
	);
};

export default withRouter(Courses);