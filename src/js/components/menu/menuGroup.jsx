'use strict';

import React from 'react';
import cn from 'classnames';

import MenuItem from './menuItem';

function MenuGroup(props) {
    if (React.Children.count(props.children) == 0) return null;
    return <ul className='menu__group'>
        {React.Children.map(props.children, child => {
            if (child == null) return null;
            if (child.type == 'li' || child.type == 'ul' || child.type.name == MenuItem.name) return child;
            return <li>{child}</li>
        })}
    </ul>
}

export default MenuGroup;
