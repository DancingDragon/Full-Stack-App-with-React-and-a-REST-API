import React, { Component } from 'react';
import Cookies from 'js-cookie';
const Context = React.createContext(); 

export class Provider extends Component {
	constructor() {
		super();
		this.state = {
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
		
		return(
			<Context.Provider value={value}>
				{this.props.children}
			</Context.Provider>
		);	
	}
	
	signIn = async (email, password, props) => {
		const requestOptions = {
			method: 'GET',
			headers: new Headers({
				'Authorization': 'Basic '+btoa(`${email}:${password}`),
				'Content-Type': 'application/json'
			})
		};
		const response = await fetch('http://localhost:5000/api/users', requestOptions);
		if (response.status === 200) {
			const user = await response.json()
			user.password = password;
			Cookies.set('authenticatedUser', JSON.stringify(user), {SameSite:'strict'})
			this.setState({authenticatedUser : user});
			try {var from = props.location.state.from;} 
			catch (error) { from = null };
			from ? props.history.push(from): props.history.goBack();
		} else if (response.status === 500) {
			props.history.push(`/error`);
		} else {
			console.log("Cant log in");
		}
        
	}
	
	signOut = () => {
		Cookies.remove('authenticatedUser', {SameSite:'strict'});
		this.setState({authenticatedUser:null});
	}
	
}

export const Consumer = Context.Consumer;

