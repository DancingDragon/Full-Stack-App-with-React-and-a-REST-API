import {createRef, useState} from 'react';
import {Consumer} from './Context';
import { withRouter } from "react-router-dom";

function Courses({history}) {
	//Use state to keep track of errors
	const [errors, setErrors] = useState([]);
	//use ref for the form
	var courseform = createRef();
	
	return (
		<Consumer>
		{ ({authenticatedUser}) => {
			//Function for sending post requset to API
			const createCourse = (e) => {
				e.preventDefault();
				//set up headers with basic auth
				const requestOptions = {
					method: 'POST',
					headers: new Headers({
						'Content-Type': 'application/json',
						'Authorization': 'Basic '+btoa(`${authenticatedUser.emailAddress}:${authenticatedUser.password}`)
					}),
					//read the body from the form.
					body: JSON.stringify(Object.fromEntries(new FormData(courseform.current)))
				};
				//send request
				fetch('http://localhost:5000/api/courses/', requestOptions)
				.then(response => {
					if (response.status === 201) {
						history.push('/');
					} 
					//if bad request update validation errors
					else if (response.status === 400) {
						response.json().then(data => {
							setErrors(data.errors);
						})
					} 
					//if server error redirect to /error
					else if (response.status === 500) {
						history.push(`/error`);
					}
				})
			}
			
			return(
				<div className="wrap">
				  <h2>Create Course</h2>
				  {
					  //Show validation errors if there are any
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