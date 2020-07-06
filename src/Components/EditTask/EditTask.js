import React, {useState, useEffect} from 'react';
import axios from 'axios';
import closeIcon from '../../assets/x.svg';
import './EditTask.scss';

export default props => {
    let [editView, setEditView] = useState(false);

    useEffect(() => {

    }, [])

    const {task} = props;
    return (
        <div className='edit-task'>
            <h3>{task.task_name}</h3>
            <img src={closeIcon} alt='close'/>
        </div>
    )
}