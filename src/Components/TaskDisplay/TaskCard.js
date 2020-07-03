import React, {useState} from 'react';
import axios from 'axios';
import EditTask from '../EditTask/EditTask';

export default props => {
    let [editView, setEditView] = useState(false);

    const completeTask = (id) => {
        axios.put(`/api/task/${id}`)
        .then(() => props.taskFn())
        .catch(err => console.log(err))
    }


    const {task} = props;
    return (
        <section className='task-container' onClick={() => setEditView(true)}>
            <div className='task-checkbox'>
                <input type='checkbox' id={`checkbox_${task.task_id}`} onChange={() => completeTask(task.task_id)} />
                <label htmlFor={`checkbox_${task.task_id}`}></label>
            </div>
            <p>{task.task_name}</p>
            {editView
            ? (
                <EditTask task={task}/>
            )
            : null}
        </section>
    )
}