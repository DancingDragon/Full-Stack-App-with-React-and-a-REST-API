import React from 'react';
import ReactDOM from 'react-dom';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';


export default ({ context  }) => {
	//Use state to store the courses
	const [courses, setCourses] = useState([])
	
	//Load the courses from the api after render
	useEffect(() => {
		fetch("http://localhost:5000/api/courses/")
		.then((res) => res.json())
		.then((json) => {
			setCourses(json);
		})
    }, []);
	
	return (
		<div className="wrap main--grid">
		  {
			//iterate over the courses and add them to the page.
			courses.map( (course, idx) => 
			  <Link className="course--module course--link" to={`courses/${course.id}`} key={idx}>
				<h2 className="course--label">Course</h2>
				<h3 className="course--title">{course.title}</h3>
			  </Link>
			)
		  }
		  
		  <Link className="course--module course--add--module" to="/courses/create">
			<span className="course--add--title">
			  <svg
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				x="0px"
				y="0px"
				viewBox="0 0 13 13"
				className="add"
			  >
				<polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " />
			  </svg>
			  New Course
			</span>
		  </Link>
		</div>
	);
};
