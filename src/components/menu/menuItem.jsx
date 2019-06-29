import React from 'react';

const MenuItem = ({ handler, children }) => (
    <li className='menu__item'>
        <button
            type='button'
            className='menu__btn'
            onClick={() => {
                handler();
            }}
        >
            {children}
        </button>
    </li>
);

MenuItem.role = 'menuItem';

export default MenuItem;
