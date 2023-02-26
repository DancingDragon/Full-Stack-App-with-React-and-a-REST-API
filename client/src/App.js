import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom'


//Import components
import {Provider} from './components/Context';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import PrivateRoute from './components/PrivateRoute';

import NotFound from './components/NotFound';

function App() {
	
  return (
    <Provider >
		<Router>
			<Header/>
			<main>
				<Switch>
					<Route exact path="/" component={Courses} />	
					<Route exact path="/signin" component={UserSignIn} />
					<Route exact path="/signout" component={UserSignOut} />
					<Route exact path="/signup" component={UserSignUp} />
					<PrivateRoute exact path="/courses/create" component={CreateCourse} />
					<Route exact path="/courses/:id" component={CourseDetail} />
					<PrivateRoute exact path="/courses/:id/update" component={UpdateCourse} />
									
					<Route path="/" component={NotFound} />
				</Switch>
			</main>
		</Router>
    </Provider >
  );
}

export default App;
