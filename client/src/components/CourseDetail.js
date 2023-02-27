import React from 'react';
import ReactDOM from 'react-dom';
import {useState, useEffect} from 'react';
import {Consumer} from './Context';
import {withRouter, Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown'


function CourseDetail({history, ...props}) {
	const [course, setCourse] = useState({})
	const [courseUser, setCourseUser] = useState({})

	
	let {id} = props.match.params;
	
	useEffect(() => {
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
			if (err.message === '404') {
				history.push("/not-found");
			} else if (err.message === '500') {
				history.push("/error");
			}
		})
	}, []);
	
	return (
	  <Consumer>
		{ ({authenticatedUser}) => {
			const deleteCourse = (e) => {
				e.preventDefault();
				const requestOptions = {
					method: 'DELETE',
					headers: new Headers({
						'Authorization': 'Basic '+btoa(`${authenticatedUser.emailAddress}:${authenticatedUser.password}`)
					}),
				};
						
				fetch(`http://localhost:5000/api/courses/${id}`, requestOptions)
				.then(response => {
					history.push('/');
				})
			}
			
			return (
				<React.Fragment>
				  <div className="actions--bar">
					<div className="wrap">
					  {authenticatedUser && authenticatedUser.id === courseUser.id ? 
						<React.Fragment>

						  <Link className="button" to={`/courses/${id}/update/`}>
							Update Course
						  </Link>
						  <button 
							className="button"
							onClick={deleteCourse}>
							Delete Course
						  </button>
						</React.Fragment>
					  :	null
					  }
					  <Link className="button button-secondary" to="/">
						Return to List
					  </Link>
					</div>
				  </div>
				  <div className="wrap">
					<h2>Course Detail</h2>
					<form>
					  <div className="main--flex">
						<div>
						  <h3 className="course--detail--title">Course</h3>
						  <h4 className="course--name">{course.title}</h4>
						  <p>By {courseUser.firstName} {courseUser.lastName}</p>
						  <ReactMarkdown children= {course.description} />
						</div>
						<div>
						  <h3 className="course--detail--title">Estimated Time</h3>
						  <p>{course.estimatedTime? course.estimatedTime : "No estimation"}</p>
						  <h3 className="course--detail--title">Materials Needed</h3>
						  <ReactMarkdown className="course--detail--list" children= {course.materialsNeeded} />
						</div>
					  </div>
					</form>
				  </div>
				</React.Fragment>
			)
		}}
	  </Consumer>
	);
};

export default withRouter(CourseDetail);