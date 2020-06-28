import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default props => {
    let [email, setEmail] = useState(''),
        [password, setPassword] = useState('');

    const handleLogin = () => {
        axios.post('/api/login', {email, password})
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
            <input value={email} onChange={e => setEmail(e.target.value)}/>
            <input value={password} onChange={e => setPassword(e.target.value)}/>
            <button onClick={handleLogin}>Login</button>
            <p>Don't have an account? <Link to='/register'>Sign up here</Link></p>
        </div>
    )
}