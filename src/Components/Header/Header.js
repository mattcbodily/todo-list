import React, { useState } from 'react';
import {withRouter} from 'react-router-dom';
import SideMenu from '../SideMenu/SideMenu';
import logo from '../../assets/todo-logo.svg';
import moreMenu from '../../assets/more-vertical.svg';
import './Header.scss';

const Header = props => {
    let [menuView, setMenuView] = useState('closed');

    const handleMenuView = () => {
        if(menuView === 'closed'){
            setMenuView('open')
        } else {
            setMenuView('closed')
        }
    }

    const {pathname} = props.location;

    return (
        <div className='main-header'>
            <section className='logo-flex'>
                <img className='main-logo' src={logo} alt='Logo' />
                <h1>Todoit</h1>
            </section>
            {pathname !== '/' && pathname !=='/login' && pathname !== '/register'
            ? (
                <>
                    <img className='more-menu' src={moreMenu} alt='More Menu' onClick={handleMenuView} />
                    <div className={`menu-backdrop-${menuView}`}>
                        <SideMenu menuView={menuView} viewFn={handleMenuView}/>
                    </div>
                </>
            )
            : null}
        </div>
    )
}

export default withRouter(Header);