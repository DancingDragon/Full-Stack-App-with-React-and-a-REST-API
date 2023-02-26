import React from 'react';
import {Link} from 'react-router-dom';

import {Consumer} from './Context';

function Header() {
	return (
	  <Consumer>
	  { ctx => 
		<header>
		  <div className="wrap header--flex">
			<h1 className="header--logo">
			  <Link to="/">Courses</Link>
			</h1>
			<nav>
			  <ul className="header--signedout">
				{ ctx.authenticatedUser ? 
				<React.Fragment>
				<li>
				Welcome {ctx.authenticatedUser.firstName}
				</li>
				<li>
				  <Link to="/signout">Sign Out</Link>
				</li>
				</React.Fragment>
				:
				<React.Fragment>
				<li>
				  <Link to="/signup">Sign Up</Link>
				</li>
				<li>
				  <Link to="/signin">Sign In</Link>
				</li>
				</React.Fragment>
				}
			  </ul>
			</nav>
		  </div>
		</header>
	  }
	  </Consumer>
	);
};

export default Header;