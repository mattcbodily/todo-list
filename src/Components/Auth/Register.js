import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default props => {
    let [firstName, setFirstName] = useState(''),
        [lastName, setLastName] = useState(''),
        [email, setEmail] = useState(''),
        [password, setPassword] = useState('');

    const handleRegister = () => {
        axios.post('/api/register', {firstName, lastName, email, password})
        .then(res => {
            props.history.push({
                pathname: '/tasks',
                user: res.data
            })
        })
        .catch(err => console.log(err));
    }

    return (
        <div>
            <input value={firstName} onChange={e => setFirstName(e.target.value)}/>
            <input value={lastName} onChange={e => setLastName(e.target.value)}/>
            <input value={email} onChange={e => setEmail(e.target.value)}/>
            <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>
            <button onClick={handleRegister}>Register</button>
            <p>Already have an account? <Link to='/login'>Login here</Link></p>
        </div>
    )
}