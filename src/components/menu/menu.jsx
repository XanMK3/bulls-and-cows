import React from 'react';
import cn from 'classnames';

const Menu = ({ isOpen, children }) => (
    <div className={cn('menu', { 'menu--open': isOpen })}>
        <div className='menu__body'>
            <div className='menu__list'>
                {children}
            </div>
        </div>
    </div>
);

export default Menu;
