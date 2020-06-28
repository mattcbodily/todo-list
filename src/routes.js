import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import Tasks from './Components/Tasks/Tasks';

export default (
    <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/tasks' component={Tasks}/>
    </Switch>
)