import React from 'react';
import {Link} from 'react-router-dom';
import './SideMenu.scss';

export default props => {
    return (
        <nav className={`side-menu ${props.menuView}`}>
            <Link className='menu-links' to='/tasks/general' onClick={props.viewFn}>General</Link>
            <Link className='menu-links' to='/tasks/today' onClick={props.viewFn}>Today</Link>
            <Link className='menu-links' to='/tasks/upcoming' onClick={props.viewFn}>Upcoming</Link>
        </nav>
    )
}