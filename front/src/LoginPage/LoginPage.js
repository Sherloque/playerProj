import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store/store'
import history from '../history/history';



const actionSend = (login,password) => {
  return dispatch => {
    return fetch("/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({login, password})
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          console.log(data.message)
        } else {
          localStorage.setItem("token", data.token)
          dispatch(loginUser(data.userInfo))
          console.log(store.getState())
          history.push("/")
        }
      })
  }
}

const loginUser = user => ({
  type: 'LOGIN_USER',
  payload: user
})



class LoginPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            login: "",
            password: "",

        }
        this.onChange1 = e => this.setState({ login: e.target.value })
        this.onChange2 = e => this.setState({ password: e.target.value })
    }
    render() {
        return (
            <div>
                <input type="text" value = {this.state.login} onChange = {this.onChange1} placeholder="login"></input>
                <input type="password" value = {this.state.password} onChange = {this.onChange2} placeholder="password"></input>
                <button
                    onClick={() => this.props.onSend(this.state.login, this.state.password)}
                />
                <Link to="/">Cancel</Link>
                <Link to="/signup">SignUp</Link>
            </div>
        );
    }

}

let ConnectedLoginPage = connect(null, { onSend: actionSend })(LoginPage)

export default ConnectedLoginPage;