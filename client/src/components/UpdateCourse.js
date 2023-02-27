import {createRef, useState, useEffect} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {Consumer} from './Context';

function Courses({history, ...props}) {
	//Use state to keep track of the courseinfo, user and errors
	const [course, setCourse] = useState({})
	const [courseUser, setCourseUser] = useState({})
	const [errors, setErrors] = useState([]);

	//Use ref for the submitform
	var courseform = createRef();

	//Check the id of the course from the url
	let {id} = props.match.params;
	
	useEffect(() => {
		//Fetch the course from the API
		fetch(`http://localhost:5000/api/courses/${id}`)
		.then(res => {
			if (res.status === 200) {
				return res.json();
			} else {
				throw new Error(res.status);
			}
		})
		.then(json => {
			//set the courseinfo and user associated with the course
			setCourse(json)
			setCourseUser(json.User);
		})
		//If something went wrong redirect to the appropriate error
		.catch(err => {
			if (err.message === '404') {
				history.push("/not-found");
			} else if (err.message === '500') {
				history.push("/error");
			}
		})
	}, []);
	
	return (
	//read the authenticated user from consumer
		<Consumer> 
		{ ({authenticatedUser}) => {
			//Redirect to forbidden if authenticated user is not the one associated with the course
			if (courseUser.id && authenticatedUser.id !== courseUser.id) {
				return <Redirect to="/forbidden"/>
			}
			
			//handle updating the course
			const updateCourse = (e) => {
				e.preventDefault();
				//Set up headers with basic auth
				const requestOptions = {
					method: 'PUT',
					headers: new Headers({
						'Content-Type': 'application/json',
						'Authorization': 'Basic '+btoa(`${authenticatedUser.emailAddress}:${authenticatedUser.password}`)
					}),
					//Read the body from the form
					body: JSON.stringify(Object.fromEntries(new FormData(courseform.current)))
				};
				//Send a request to the api
				fetch(`http://localhost:5000/api/courses/${id}`, requestOptions)
				.then(response => {
					if (response.status === 204) {
						//Go to the coursepage if everything went ok
						history.push(`/courses/${id}`);
					} else if (response.status === 400) {
						//update validation errors
						response.json().then(data => {
							setErrors(data.errors);
						})
					} else if (response.status === 500) {
						//Redirect to error if something went wrong
						history.push(`/error`);
					}
				})
			}
			
			
			return (
				<div className="wrap">
				  <h2>Update Course</h2>
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
						  defaultValue={course.title}
						/>
						<p>By Joe Smith</p>
						<label htmlFor="courseDescription">Course Description</label>
						<textarea
						  id="courseDescription"
						  name="description"
						  defaultValue={course.description}
						/>
					  </div>
					  <div>
						<label htmlFor="estimatedTime">Estimated Time</label>
						<input
						  id="estimatedTime"
						  name="estimatedTime"
						  type="text"
						  defaultValue={course.estimatedTime}
						/>
						<label htmlFor="materialsNeeded">Materials Needed</label>
						<textarea
						  id="materialsNeeded"
						  name="materialsNeeded"
						  defaultValue={course.materialsNeeded}
						/>
					  </div>
					</div>
					<button 
						className="button" 
						onClick={updateCourse}>
					  Update Course needs to fix
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