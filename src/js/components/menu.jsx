'use strict';

import React from 'react';
import cn from 'classnames';

function Menu(props) {
    return <div className={cn('menu', { 'menu--open': props.open || !props.allowClose })}>
        <header className='menu__header'>
            {props.allowClose ? <button type='button' className='icon' onClick={props.close}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button> : null}
        </header>
        <div className='menu__body'>
            <ul className='menu__list'>
                {React.Children.map(props.children, child => {
                    return child && React.cloneElement(child, { closeMenu: props.close })
                })}
            </ul>
        </div>
    </div>
}

function MenuItem(props) {
    return <li>
        <button className='menu__item' onClick={() => {
            props.handler();
            props.closeMenu();
        }}>{props.children}</button>
    </li>;
}

export { Menu, MenuItem };

export default Menu;
