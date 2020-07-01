import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import ProjectModal from '../ProjectModal/ProjectModal';
import addIcon from '../../assets/plus.svg';
import './SideMenu.scss';

const SideMenu = props => {
    let [projects, setProjects] = useState([]),
        [modalView, setModalView] = useState(false);

    const getProjects = () => {
        axios.get(`/api/projects/${props.user.user_id}`)
            .then(res => setProjects(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getProjects();
    }, [])

    return (
        <div>
            <nav className={`side-menu ${props.menuView}`}>
                <Link className='menu-links' to='/tasks/general' onClick={props.viewFn}>General</Link>
                <Link className='menu-links' to='/tasks/today' onClick={props.viewFn}>Today</Link>
                <Link className='menu-links' to='/tasks/upcoming' onClick={props.viewFn}>Upcoming</Link>
                <p className='project-list-prompt'>Projects</p>
                <section className='add-project' onClick={() => setModalView(true)}>
                    <img src={addIcon} alt='Add Project' />
                    <p>Add Project</p>
                </section>
            </nav>
            {modalView
                ? (
                    <div className='modal-backdrop'>
                        <ProjectModal user={props.user} modalFn={setModalView} projectFn={getProjects} />
                    </div>  
                )
                : null}
        </div>
    )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(SideMenu);