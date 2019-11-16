import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store/store'
import history from '../history/history';
import jwt_decode from 'jwt-decode';
import Chart from './Chart'

const mapStateToProps = store => ({
    User: store.currentUser,
});

const logoutUser = () => ({
    type: 'LOGOUT_USER',
    action: localStorage.removeItem("token")
}, history.push("/"))


  
class MainPage extends React.Component {
    render() {
        return (
            <div>
                {(localStorage.token) ? (
                    <><p>Hello, {jwt_decode(localStorage.token).sub.login}</p>
                        <Link to="/profile">Profile</Link>
                        <button onClick={logoutUser}>LAGAUT</button>
                        <Chart></Chart>
                    </>

                ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">SignUp</Link>
                        </>
                    )}
            </div>
        );
    }

}

let ConnectedMainPage = connect(mapStateToProps)(MainPage);

export default ConnectedMainPage;