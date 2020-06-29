import React, {useState} from 'react';
import {Switch, Route} from 'react-router-dom';
import TaskDisplay from '../TaskDisplay/TaskDisplay';

export default props => {
    let [user, setUser] = useState(props.location.user)

    return (
        <div>
            <Switch>
                <Route path='/tasks/general' render={() => <TaskDisplay {...props} taskList='general'/>}/>
                <Route path='/tasks/today' render={() => <TaskDisplay {...props} />}/>
                <Route path='/tasks/upcoming' render={() => <TaskDisplay {...props} />}/>
                <Route path='/tasks/:id' render={() => <TaskDisplay {...props} />}/>
            </Switch>
        </div>
    )
}