import React, {useState} from 'react';
import {Switch, Route} from 'react-router-dom';
import TaskDisplay from '../TaskDisplay/TaskDisplay';

export default props => {
    let [user, setUser] = useState(props.location.user)

    return (
        <div>
            <Switch>
                <Route exact path='/tasks' render={() => <TaskDisplay {...props} taskList='general' user={user}/>}/>
                <Route path='/tasks/today' render={() => <TaskDisplay {...props} taskList='today' user={user}/>}/>
                <Route path='/tasks/upcoming' render={() => <TaskDisplay {...props} taskList='upcoming' user={user}/>}/>
                <Route path='/tasks/:id' render={() => <TaskDisplay {...props} taskList='project' user={user}/>}/>
            </Switch>
        </div>
    )
}