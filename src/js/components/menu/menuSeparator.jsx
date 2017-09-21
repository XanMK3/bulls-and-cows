'use strict';

import React from 'react';

function MenuSeparator(props) {
    return <li className='menu__separator'>
        {props.children || <hr className='menu__default-separator-element' />}
    </li>;
}

export default MenuSeparator;
