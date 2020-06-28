import React from 'react';
import {Link} from 'react-router-dom';

export default props => (
    <div>
        <h1>Welcome to Todoit!</h1>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
    </div>
)