'use strict';

import React from 'react';
import cn from 'classnames';

function Menu(props) {
    return <div className={cn('menu', { 'menu--open': props.open || !props.allowClose })}>
        <header className='menu__header'>
            {props.allowClose ? <button type='button' className='icon' onClick={props.close}>
                <svg className='svg-icon'><use xlinkHref="assets/sprite.svg#x"></use></svg>
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
