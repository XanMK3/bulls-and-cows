'use strict';

import React from 'react';
import cn from 'classnames';

function SubMenu(props) {
    return <div className={cn('submenu', { 'submenu--open': props.isOpen })}>
        <header className='menu__header'>
            <button type='button' className='icon' onClick={props.back}>
                back
            </button>
        </header>
        <div className='menu__body menu__body--with-header'>
            {props.children}
        </div>
    </div>
}

export default SubMenu;
