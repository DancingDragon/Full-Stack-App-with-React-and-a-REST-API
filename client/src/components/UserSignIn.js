import React, {createRef} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {Consumer} from './Context';
function UserSignIn( props ) {
    const email = createRef();
    const password = createRef();
	return (
	  <Consumer>
	  { (ctx) => 
		<div className="form--centered">
		  <h2>Sign In</h2>
		  <form>
			<label htmlFor="emailAddress">Email Address</label>
			<input ref={email} id="emailAddress" name="emailAddress" type="email" defaultValue="" />
			<label htmlFor="password">Password</label>
			<input ref={password} id="password" name="password" type="password" defaultValue="" />
			<button 
				className="button" 
				onClick={(e) => {
						e.preventDefault();
						ctx.signIn(email.current.value, password.current.value, props);
					}
				}
			>
			  Sign In
			</button>
			<button
			  className="button button-secondary"
			  onClick={()=>props.history.push('/')}
			>
			  Cancel
			</button>
		  </form>
		  <p>
			Don't have a user account? Click here to <Link to="/signup">sign up</Link>!
		  </p>
		</div>
	  }
	  </Consumer>
	);
};

export default withRouter(UserSignIn);