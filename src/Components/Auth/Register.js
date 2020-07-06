import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';
import axios from 'axios';

const Register = props => {
    let [firstName, setFirstName] = useState(''),
        [lastName, setLastName] = useState(''),
        [email, setEmail] = useState(''),
        [password, setPassword] = useState('');

    const handleRegister = () => {
        axios.post('/api/register', {firstName, lastName, email, password})
        .then(res => {
            props.getUser(res.data);
            props.history.push('/tasks');
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='auth-container'>
            <h1>Register</h1>
            <label>First Name</label>
            <input value={firstName} onChange={e => setFirstName(e.target.value)}/>
            <label>Last Name</label>
            <input value={lastName} onChange={e => setLastName(e.target.value)}/>
            <label>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)}/>
            <label>Password</label>
            <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>
            <button onClick={handleRegister}>Register</button>
            <p>Already have an account? <Link to='/login'>Login here</Link></p>
        </div>
    )
}

export default connect(null, {getUser})(Register);