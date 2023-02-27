import {createRef} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {Consumer} from './Context';

function UserSignIn( props ) {
	//Use references to keep track of the email and password inputs
    const email = createRef();
    const password = createRef();
	
	return (
	//Use consumer/Provider to get access to the signin function.
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
						//sign in using the info in the form
						e.preventDefault();
						ctx.signIn(email.current.value, password.current.value, props);
					}
				}
			>
			  Sign In
			</button>
			<button
			  className="button button-secondary"
			  //Go back to courses if cancel button is pressed.
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