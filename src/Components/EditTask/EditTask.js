import React from 'react';
import './EditTask.scss';

export default props => {
    const {task} = props;
    return (
        <div className='edit-task'>
            <h3>{task.task_name}</h3>
        </div>
    )
}