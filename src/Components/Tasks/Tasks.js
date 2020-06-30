import React, {useState} from 'react';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import TaskDisplay from '../TaskDisplay/TaskDisplay';

const Tasks = props => (
    <Switch>
        <Route exact path='/tasks' render={() => <TaskDisplay {...props} taskList='General' user={props.user}/>}/>
        <Route path='/tasks/today' render={() => <TaskDisplay {...props} taskList='Today' user={props.user}/>}/>
        <Route path='/tasks/upcoming' render={() => <TaskDisplay {...props} taskList='Upcoming' user={props.user}/>}/>
        <Route path='/tasks/:id' render={() => <TaskDisplay {...props} taskList='Project' user={props.user}/>}/>
    </Switch>
)

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Tasks);