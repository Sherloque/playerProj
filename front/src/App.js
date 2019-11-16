import React, { Component } from 'react';
import './App.css';
import { GraphQLClient } from 'graphql-request'
import { Provider, connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { Router, Route, Link, Switch } from 'react-router-dom';
import MainPage from 'MainPage/MainPage';
import LoginPage from 'LoginPage/LoginPage';
import SignUpPage from 'SignUpPage/SignUpPage';
import ProfilePage from 'ProfilePage/ProfilePage';
import store from './store/store'
import history from './history/history';
const gql = new GraphQLClient("/graphql", { headers: {} })

function App() {
	return (
		<Provider store={store}>
		<Router history={history}>
			<div>
				<Route path="/" component={MainPage} exact />
				<Route path="/login" component={LoginPage} exact />
				<Route path="/signup" component={SignUpPage} exact />
				<Route path="/profile" component={ProfilePage} exact />
			</div>
		</Router>
		</Provider>
	)
}


export default App;
