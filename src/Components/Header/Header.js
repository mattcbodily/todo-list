import React from 'react';
import logo from '../../assets/todo-logo.svg';
import moreMenu from '../../assets/more-vertical.svg';
import './Header.scss';

export default props => (
    <div className='main-header'>
        <section className='logo-flex'>
            <img className='main-logo' src={logo} alt='Logo'/>
            <h1>Todoit</h1>
        </section>
        <img src={moreMenu} alt='More Menu'/>
    </div>
)