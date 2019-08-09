import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import UserManager from '../oidc-client/config'


//pass through props and only render the component if the user is authenticated
const PrivateRoute = ({isAuthenticated, component: Component}) => (
	<Route
		{/*pass through props*/}
		{...props} component={() => (
			isAuthenticated? (
				<Component {...props}/>
			) : (
				<Redirect to='/'/>
			)
	)}
	/>
);

const mapStateToProps = state => ({
	isAuthenticated: !!UserManager.getUser() //checking if user is authenticated/logged in
});

export default (mapStateToProps)(PrivateRoute);
