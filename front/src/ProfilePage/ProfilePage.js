import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../store/store'
import history from '../history/history';
import jwt_decode from 'jwt-decode';


class ProfilePage extends React.Component {
    render() {
        return (
            <div>
                <p>Логин:{jwt_decode(localStorage.token).sub.login}</p>
                <p>Имя:{jwt_decode(localStorage.token).sub.firstname}</p>
                <p>Фамилия:{jwt_decode(localStorage.token).sub.lastname}</p>
                <Link to="/">На главную</Link>
            
            </div>
        );
    }

}

export default ProfilePage;