import React, {useState, useEffect} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {Consumer} from './Context';

function UserSignOut( props ) {
	let signout = null;
	
	useEffect(() => {
		signout();
	}, []);
	
	return (
	  <Consumer>
	  { (ctx) => {
		signout = ctx.signOut;
		return <Redirect to="/"/>
	  }
	  }
	  </Consumer>
	);
};

export default withRouter(UserSignOut);