import React, {useState} from 'react';
import {Switch, Route} from 'react-router-dom';
import TaskDisplay from '../TaskDisplay/TaskDisplay';

export default props => (
    <Switch>
        <Route exact path='/tasks' render={props => <TaskDisplay {...props} taskList='General'/>}/>
        <Route path='/tasks/today' render={props => <TaskDisplay {...props} taskList='Today'/>}/>
        <Route path='/tasks/upcoming' render={props => <TaskDisplay {...props} taskList='Upcoming'/>}/>
        <Route path='/tasks/:id' render={props => <TaskDisplay {...props} taskList='Project'/>}/>
    </Switch>
)