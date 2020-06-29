import React, {useState} from 'react';
import {Switch, Route} from 'react-router-dom';
import TaskDisplay from '../TaskDisplay/TaskDisplay';

export default props => {
    let [user, setUser] = useState(props.location.user)

    return (
        <div>
            <Switch>
                <Route exact path='/tasks' render={() => <TaskDisplay {...props} taskList='General' user={user}/>}/>
                <Route path='/tasks/today' render={() => <TaskDisplay {...props} taskList='Today' user={user}/>}/>
                <Route path='/tasks/upcoming' render={() => <TaskDisplay {...props} taskList='Upcoming' user={user}/>}/>
                <Route path='/tasks/:id' render={() => <TaskDisplay {...props} taskList='Project' user={user}/>}/>
            </Switch>
        </div>
    )
}