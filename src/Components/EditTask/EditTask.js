import React, {useState} from 'react';
import axios from 'axios';
import editIcon from '../../assets/edit-2.svg';
import closeIcon from '../../assets/x.svg';
import './EditTask.scss';

export default props => {
    let [taskName, setTaskName] = useState(''),
        [taskDate, setTaskDate] = useState(''),
        [editNameView, setEditNameView] = useState(false),
        [editDateView, setEditDateView] = useState(false);
    
    const {task} = props;

    const editTaskName = () => {
        axios.put('/api/task-name', {id: task.task_id, taskName})
        .then(() => {
            props.taskFn();
            setEditNameView(false);
        })
        .catch(err => console.log(err));
    }

    const editTaskDate = () => {
        axios.put('/api/task-date', {id: task.task_id, completeBy: taskDate})
        .then(() => {
            props.taskFn();
            setEditDateView(false);
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='edit-task'>
            <section>
            {editNameView
                ? (
                    <>
                        <input value={taskName} onChange={e => setTaskName(e.target.value)}/>
                        <button onClick={editTaskName}>Submit</button>
                    </>
                )
                : (
                    <>
                        <p>{task.task_name}</p> 
                        <img src={editIcon} alt='edit' onClick={() => setEditNameView(true)}/>
                    </>
                )}
            </section>
            <section>
                {editDateView
                ? (
                    <>
                        <input type='date' value={taskDate} onChange={e => setTaskDate(e.target.value)}/>
                        <button onClick={editTaskDate}>Submit</button>
                    </>
                )
                : (
                    <>
                        <p>{task.complete_by}</p> 
                        <img src={editIcon} alt='edit' onClick={() => setEditDateView(true)}/>
                    </>
                )}
            </section>
            <img src={closeIcon} alt='close' onClick={() => props.editViewFn(false)}/>

        </div>
    )
}