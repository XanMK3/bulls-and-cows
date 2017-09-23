'use strict';

import React from 'react';
import cn from 'classnames';

import { COLORS } from 'js/const';

function Ball(props) {
    return <div className={cn('ball', { active: !props.readOnly, dradding: props.isDragging, over: props.isOver, preview: props.preview })}
        onClick={props.readOnly ? null : e => { props.onChange(props.index) }}>
        <span className='ball__content' style={{ backgroundColor: COLORS[props.type] }}></span>
    </div>;
}

export default Ball;
