'use strict';

import React from 'react';

function MenuItem(props) {
    return <li className='menu__item'>
        <button className='menu__btn' onClick={() => { props.handler(); }}>
            {props.children}
        </button>
    </li>;
}

export default MenuItem;
