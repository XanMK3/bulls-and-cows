'use strict';

import React from 'react';
import cn from 'classnames';

import { COLORS } from 'js/const';

function Ball(props) {
    return (
        <span style={{ backgroundColor: COLORS[props.type] }} className={cn('ball', { active: !props.readOnly })}
            onClick={props.readOnly ? null : e => { props.onChange(props.index) }}></span>
    )
}

export default Ball;
