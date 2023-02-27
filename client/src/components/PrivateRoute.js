import {Route, Redirect} from 'react-router-dom'
import {Consumer} from './Context';

export default function PrivateRoute({ component: Component, ...rest }) {
  return (
  // Build a route with the same attributes
	<Route
	  {...rest}
	  render={(props) =>
	  // add a consumer so that we can access the authenticated user
		<Consumer>
		{ (ctx) => 
		//check if user is authenticated
			ctx.authenticatedUser ? (
			  //if they are authenticated render the component as normal
			  <Component {...rest}/>
			) : (
			//Otherwise redirect to the signinpage
			  <Redirect
				to={{
					pathname: "/signin",
					//store where we redirected from
					state: { from: rest.location.pathname }
				}}
			  />

			)
		}
		</Consumer>
	  }
	/>
  );
}