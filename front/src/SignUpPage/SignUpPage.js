import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store/store'
import history from '../history/history';



const actionSend = (login,password,firstname,lastname) => {
	fetch("/signup",{
	  method: "POST",
	  headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	  },
	  body: JSON.stringify({login,password,firstname,lastname})
	})
	  .then(res => res.json())
      .then(res => store.dispatch({type: 'REGISTERED'}))
      console.log('front vse gud')
      history.push('/')
	return {
	  type: 'REGISTERED'
	}
  }




class SignUpPage extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
                login: "",
                password: "",
                firstname: "",
                lastname: ""
        }

        this.onChange1 = e => this.setState({login: e.target.value})
        this.onChange2 = e => this.setState({password: e.target.value})
        this.onChange3 = e => this.setState({password: e.target.value})
        this.onChange4 = e => this.setState({firstname: e.target.value})
        this.onChange5 = e => this.setState({lastname: e.target.value})
    }
    render() {
        return (
            <>
                <input type="text" value = {this.state.login} onChange = {this.onChange1} placeholder="login"></input>
                <input type="password" value = {this.state.password}onChange = {this.onChange2} placeholder="password"></input>
                <input type="password" value = {this.state.password} onChange = {this.onChange3} placeholder="repeat password"></input>
                <input type="text" value = {this.state.irstname} onChange = {this.onChange4} placeholder="Firstname"></input>
                <input type="text" value = {this.state.lastname} onChange = {this.onChange5} placeholder="Lastname"></input>
                <button
                    onClick={() => this.props.onSend(this.state.login, this.state.password, this.state.firstname, this.state.lastname)}
                />
                <Link to="/login">Login</Link>
                <Link to="/">Cancel</Link>
            </>
        );
    }
}

let ConnectedSignUpPage = connect(null, { onSend: actionSend })(SignUpPage)

export default ConnectedSignUpPage;