import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import {Consumer} from './Context';
import Header from './Header';
export default function PrivateRoute({ component: Component, ...rest }) {
  return (
	<Route
	  {...rest}
	  render={(props) =>
		<Consumer>
		{ (ctx) => 
			ctx.authenticatedUser ? (
			  <Component {...rest}/>
			) : (
			  <Redirect
				to={{
					pathname: "/signin",
					state: { from: rest.path }
				}}
			  />

			)
		}
		</Consumer>
	  }
	/>
  );
}