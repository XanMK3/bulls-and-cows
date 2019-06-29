import React from 'react';
import cn from 'classnames';

const SubMenu = ({ isOpen, back, children }) => (
    <div className={cn('submenu', { 'submenu--open': isOpen })}>
        <header className='menu__header'>
            <button type='button' className='icon' onClick={back}>
                back
            </button>
        </header>
        <div className='menu__body menu__body--with-header'>
            {children}
        </div>
    </div>
);

export default SubMenu;
