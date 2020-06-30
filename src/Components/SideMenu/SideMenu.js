import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import addIcon from '../../assets/plus.svg';
import './SideMenu.scss';

const SideMenu = props => {
    let [projects, setProjects] = useState([]);

    const getProjects = () => {
        axios.get(`/api/projects/${props.user.user_id}`)
        .then(res => setProjects(res.data))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getProjects();
    }, [])

    return (
        <nav className={`side-menu ${props.menuView}`}>
            <Link className='menu-links' to='/tasks/general' onClick={props.viewFn}>General</Link>
            <Link className='menu-links' to='/tasks/today' onClick={props.viewFn}>Today</Link>
            <Link className='menu-links' to='/tasks/upcoming' onClick={props.viewFn}>Upcoming</Link>
            <p className='project-list-prompt'>Projects</p>
            <section className='add-project'>
                <img src={addIcon} alt='Add Project'/>
                <p>Add Project</p>
            </section>
        </nav>
    )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(SideMenu);