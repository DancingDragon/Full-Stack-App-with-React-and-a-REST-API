import React, {createRef} from 'react';
import {useState, useEffect} from 'react';

import {withRouter, Link} from 'react-router-dom';
import {Consumer} from './Context';

function UserSignUp(props) {
	const suform = createRef();
	const [errors, setErrors] = useState([]);

	return (
		<Consumer>
			{ (ctx) => {
				const signUp = async () => {
					var formdata = Object.fromEntries(new FormData(suform.current))
					const requestOptions = {
						method: 'POST',
						headers: new Headers({
							'Content-Type': 'application/json'
						}),
						body: JSON.stringify(formdata)
					};
					const response = await fetch('http://localhost:5000/api/users', requestOptions);
					if (response.status === 201) {
						ctx.signIn(formdata.emailAddress, formdata.password, props)
					} else {
						response.json().then(data => {
							setErrors(data.errors);
						})
					}
				}
				return (
					<div className="form--centered">
					  <h2>Sign Up</h2>
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
					  <form ref={suform}>
						<label htmlFor="firstName">First Name</label>
						<input id="firstName" name="firstName" type="text" defaultValue="" />
						<label htmlFor="lastName">Last Name</label>
						<input id="lastName" name="lastName" type="text" defaultValue="" />
						<label htmlFor="emailAddress">Email Address</label>
						<input id="emailAddress" name="emailAddress" type="email" defaultValue="" />
						<label htmlFor="password">Password</label>
						<input id="password" name="password" type="password" defaultValue="" />
						<button 
							className="button" 
							onClick={(e) => 
								{
									e.preventDefault();
									signUp(suform.current, props);
								}
							}
						>
						  Sign Up
						</button>
						<button
						  className="button button-secondary"
						  onClick={()=>props.history.push('/')}
						>
						  Cancel
						</button>
					  </form>
					  <p>
						Already have a user account? Click here to{" "}
						<Link to="/signin">sign in</Link>!
					  </p>
					</div>
				)
			}}
		</Consumer>
	);
};

export default withRouter(UserSignUp);