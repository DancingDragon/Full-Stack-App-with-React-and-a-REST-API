import React, {createRef} from 'react';
import {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {Consumer} from './Context';

function Courses({history, ...props}) {
	const [course, setCourse] = useState({})
	const [courseUser, setCourseUser] = useState({})
	const [errors, setErrors] = useState([]);
	var courseform = createRef();

	let {id} = props.match.params;
	
	useEffect(() => {
		let redirect = false;
		fetch(`http://localhost:5000/api/courses/${id}`)
		.then(res => {
			if (res.status === 200) {
				return res.json();
			} else {
				throw new Error(res.status);
			}
		})
		.then(json => {
			setCourse(json)
			setCourseUser(json.User);
	}
		)
		.catch(err => {
			history.push("/not-found");
		})
	}, []);
	
	if (course !== {}) {
	return (
		<Consumer> 
		{ ({authenticatedUser}) => {
			const updateCourse = (e) => {
				e.preventDefault();
				const requestOptions = {
					method: 'PUT',
					headers: new Headers({
						'Content-Type': 'application/json',
						'Authorization': 'Basic '+btoa(`${authenticatedUser.emailAddress}:${authenticatedUser.password}`)
					}),
					body: JSON.stringify(Object.fromEntries(new FormData(courseform.current)))
				};
				fetch(`http://localhost:5000/api/courses/${id}`, requestOptions)
				.then(response => {
					if (response.status === 204) {
						history.push(`/courses/${id}`);
					} else {
						response.json().then(data => {
							setErrors(data.errors);
						})
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
	}
};

export default withRouter(Courses);