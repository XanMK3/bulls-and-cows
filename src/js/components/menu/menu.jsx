'use strict';

import React from 'react';
import cn from 'classnames';

function Menu(props) {
    return <div className={cn('menu', { 'menu--open': props.isOpen })}>
        <div className='menu__body'>
            <div className='menu__list'>
                {props.children}
            </div>
        </div>
    </div>
}

export default Menu;
