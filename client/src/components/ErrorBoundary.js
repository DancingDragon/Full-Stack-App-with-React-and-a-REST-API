import React from 'react';
import { withRouter } from "react-router-dom";

import Header from './Header';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentDidCatch(error, errorInfo) {   
	console.log(this.props.history.push("/error"))
  }
  render() {
    return this.props.children; 
  }
}

export default withRouter(ErrorBoundary);