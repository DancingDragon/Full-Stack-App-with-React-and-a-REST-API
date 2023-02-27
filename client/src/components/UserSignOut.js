import React, {useState, useEffect} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {Consumer} from './Context';

function UserSignOut() {
	let signout = null;
	
	//signout once the page has rendered
	useEffect(() => {
		signout();
	}, []);
	
	return (
	  <Consumer>
	  { (ctx) => {
		//get the signout function from the context.
		signout = ctx.signOut;
		return <Redirect to="/"/>
	  }}
	  </Consumer>
	);
};

export default withRouter(UserSignOut);