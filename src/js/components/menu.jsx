'use strict';

import React from 'react';

function Menu(props) {
    if (!props.showMenu) return null;

    return <div className='menu'>
        <ul className='menu__list'>
            <li><button className='menu__item'>Item1</button></li>
            <li><button className='menu__item'>Item2</button></li>
            <li><button className='menu__item'>Item3</button></li>
        </ul>    
    </div>
}

export default Menu;
