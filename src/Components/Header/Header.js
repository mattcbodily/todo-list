import React, { useState } from 'react';
import SideMenu from '../SideMenu/SideMenu';
import logo from '../../assets/todo-logo.svg';
import moreMenu from '../../assets/more-vertical.svg';
import './Header.scss';

export default props => {
    let [menuView, setMenuView] = useState('closed');

    const handleMenuView = () => {
        if(menuView === 'closed'){
            setMenuView('open')
        } else {
            setMenuView('closed')
        }
    }

    return (
        <div className='main-header'>
            <section className='logo-flex'>
                <img className='main-logo' src={logo} alt='Logo' />
                <h1>Todoit</h1>
            </section>
            <img className='more-menu' src={moreMenu} alt='More Menu' onClick={handleMenuView} />
                    <div className={`menu-backdrop-${menuView}`}>
                        <SideMenu menuView={menuView}/>
                    </div>
        </div>
    )
}