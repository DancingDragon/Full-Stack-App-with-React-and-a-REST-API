import React, { Component } from 'react';
const Context = React.createContext(); 

export class Provider extends Component {
	constructor() {
		super();
		this.state = {
			authenticatedUser: null
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
			this.setState({authenticatedUser : user});
			props.history.push("/");
		} else {
			console.log("Cant log in");
		}
        
	}
	
	signOut = () => {
		this.setState({authenticatedUser:null});
	}
	
}

export const Consumer = Context.Consumer;

