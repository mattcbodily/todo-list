import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';
import axios from 'axios';
import './Auth.scss';

const Login = props => {
    let [email, setEmail] = useState(''),
        [password, setPassword] = useState('');

    const handleLogin = () => {
        axios.post('/api/login', {email, password})
        .then(res => {
            props.getUser(res.data);
            props.history.push('/tasks');
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='auth-container'>
            <h1>Log in</h1>
            <label>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)}/>
            <br/>
            <label>Password</label>
            <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>
            <br/>
            <button onClick={handleLogin}>Log in</button>
            <p>Don't have an account? <Link to='/register'>Sign up here</Link></p>
        </div>
    )
}

export default connect(null, {getUser})(Login);