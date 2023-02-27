import React, { Component } from 'react';
import Cookies from 'js-cookie';

//initiate context
const Context = React.createContext(); 

export class Provider extends Component {
	constructor() {
		super();
		this.state = {
			//grab authenticatedUser from cookie if it exists
			authenticatedUser: Cookies.get('authenticatedUser') ? JSON.parse(Cookies.get('authenticatedUser')) : null
		};
	}
	
	render() {
		const {authenticatedUser} = this.state;
		const value = {
			authenticatedUser,
			signIn: this.signIn,
			signOut: this.signOut,
			signUp: this.signUp
		} 
		
		//return children components wrappen in a provider
		return(
			<Context.Provider value={value}>
				{this.props.children}
			</Context.Provider>
		);	
	}
	
	//handles Signing in user
	signIn = async (email, password, props) => {
		//Set up headers for a get request with basic auth 
		const requestOptions = {
			method: 'GET',
			headers: new Headers({
				'Authorization': 'Basic '+btoa(`${email}:${password}`),
				'Content-Type': 'application/json'
			})
		};
		//Send request to api
		const response = await fetch('http://localhost:5000/api/users', requestOptions);
		//If everythings fine
		if (response.status === 200) {
			const user = await response.json()
			user.password = password;
			//Set a cookie with the returned user + password
			Cookies.set('authenticatedUser', JSON.stringify(user), {SameSite:'strict'})
			this.setState({authenticatedUser : user});
			
			//If we were redirected from somewhere go to that location
			try {
				props.history.push(props.location.state.from);
			} 
			//otherwise go back.
			catch (error) { 
				props.history.goBack() 
			};
		} else if (response.status === 500) {
			props.history.push(`/error`);
		} else {
			console.log("Cant log in");
		}
        
	}
	
	//Handles signing out users
	signOut = () => {
		//remove cookie and remove user from state.
		Cookies.remove('authenticatedUser', {SameSite:'strict'});
		this.setState({authenticatedUser:null});
	}
	
}

export const Consumer = Context.Consumer;

