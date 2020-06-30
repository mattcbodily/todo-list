import React, { useState, useEffect } from 'react';
import axios from 'axios';
import addIcon from '../../assets/plus.svg';
import './TaskDisplay.scss';

export default props => {
    let [tasks, setTasks] = useState([]),
        [addView, setAddView] = useState(false),
        [taskName, setTaskName] = useState(''),
        [completeBy, setCompleteBy] = useState('');

    const getTasks = () => {
        const { user_id } = props.user,
            { id } = props.match.params;

        let today = new Date();
        let day = today.getDate();
        let month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
        let year = today.getFullYear();
        today = `${year}-${month}-${day}`;

        switch (props.taskList) {
            case 'General':
                axios.get(`/api/tasks/${user_id}`)
                    .then(res => setTasks(res.data))
                    .catch(err => console.log(err));
                break;
            case 'Today':
                axios.get(`/api/today-tasks/${user_id}/${today}`)
                    .then(res => setTasks(res.data))
                    .catch(err => console.log(err))
                break;
            case 'Upcoming':
                axios.get(`/api/upcoming-tasks/${user_id}/${today}`)
                    .then(res => setTasks(res.data))
                    .catch(err => console.log(err))
                break;
            case 'Project':
                axios.get(`/api/project-tasks/${id}`)
                    .then(res => setTasks(res.data))
                    .catch(err => console.log(err))
                break;
        }
    }

    useEffect(() => {
        getTasks();
    }, [props.taskList])

    const createTask = () => {
        const {user_id} = props.user;
        const {id} = props.match.params;

        let newTask = {
            taskName,
            completeBy,
            userId: user_id,
            projectId: id || null
        }

        axios.post('/api/task', newTask)
        .then(() => {
            getTasks();
            setAddView(false);
        })
        .catch(err => console.log(err));
    }

    const completeTask = (id) => {
        axios.put(`/api/task/${id}`)
        .then(() => getTasks())
        .catch(err => console.log(err))
    }

    return (
        <div className='task-display'>
            <h1>{props.taskList}</h1>
            {tasks.sort((a, b) => a.complete_by - b.complete_by).map(task => (
                <section key={task.task_id} className='task-container'>
                    <div className='task-checkbox'>
                        <input type='checkbox' id={`checkbox_${task.task_id}`} onChange={() => completeTask(task.task_id)}/>
                        <label htmlFor={`checkbox_${task.task_id}`}></label>
                    </div>  
                    <p>{task.task_name}</p>
                </section>
            ))}
            {!addView
            ? (
                <section className='add-task' onClick={() => setAddView(true)}>
                    <img src={addIcon} alt='Add Task' />
                    <p>Add Task</p>
                </section>
                )
            : (
                <section className='add-task-modal'>
                    <input value={taskName} onChange={e => setTaskName(e.target.value)}/>
                    <input type='date' value={completeBy} onChange={e => setCompleteBy(e.target.value)}/>
                    <button onClick={createTask}>Add Task</button>
                    <button onClick={() => setAddView(false)}>Cancel</button>
                </section>
            )}
        </div>
    )
}