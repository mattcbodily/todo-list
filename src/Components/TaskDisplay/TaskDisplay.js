import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default props => {
    let [tasks, setTasks] = useState([]);

    const getTasks = () => {
        const { user_id } = props.user,
            { id } = props.match.params;

        let today = new Date();
        let day = today.getDate();
        let month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
        let year = today.getFullYear();
        today = `${year}-${month}-${day}`;

        switch (props.taskList) {
            case 'general':
                axios.get(`/api/tasks/${user_id}`)
                    .then(res => setTasks(res.data))
                    .catch(err => console.log(err));
                break;
            case 'today':
                axios.get(`/api/today-tasks/${user_id}/${today}`)
                    .then(res => setTasks(res.data))
                    .catch(err => console.log(err))
                break;
            case 'upcoming':
                axios.get(`/api/upcoming-tasks/${user_id}/${today}`)
                    .then(res => setTasks(res.data))
                    .catch(err => console.log(err))
                break;
            case 'project':
                axios.get(`/api/project-tasks/${id}`)
                    .then(res => setTasks(res.data))
                    .catch(err => console.log(err))
                break;
        }
    }

    useEffect(() => {
        getTasks();
    }, [props.taskList])

    return (
        <div>
            {tasks.map((task, i) => (
                <section key={i}>{task.task_name}</section>
            ))}
        </div>
    )
}