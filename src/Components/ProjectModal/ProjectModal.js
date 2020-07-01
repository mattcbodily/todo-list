import React, {useState} from 'react';
import axios from 'axios';
import './ProjectModal.scss';
import { createStore } from 'redux';

export default props => {
    let [projectName, setProjectName] = useState(''),
        [colorScheme, setColorScheme] = useState([]);

    const createProject = () => {
        axios.post('/api/project', {projectName, id: props.user.user_id})
        .then(() => {
            props.projectFn();
            props.modalFn(false);
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='project-modal'>
            <div className='project-modal-prompt'>
                <h3>Add Project</h3>
            </div>
            <p>Project Name</p>
            <input value={projectName} onChange={e => setProjectName(e.target.value)}/>
            <p>Project Color</p>
            <div className='project-color'></div>
            <section className='button-display'>
                <button id='add-button' onClick={createProject}>Add</button>
                <button id='cancel-button' onClick={() => props.modalFn(false)}>Cancel</button>
            </section>
        </div>
    )
}