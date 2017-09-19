'use strict';

import React from 'react';

function MenuItem(props) {
    return <li>
        <button className='menu__item' onClick={() => {
            props.handler();
            props.closeMenu();
        }}>{props.children}</button>
    </li>;
}

export default MenuItem;
