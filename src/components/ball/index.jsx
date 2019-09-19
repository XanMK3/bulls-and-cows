/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import cn from 'classnames';
import { COLORS } from 'const';
import './style';

const Ball = ({
    index,
    kind,
    active,
    isDragging,
    isOver,
    preview,
    onChange,
}) => (
    <div
        className={cn(
            'ball', {
                active,
                preview,
                dradding: isDragging,
                over: isOver,
            },
        )}
        onClick={() => {
            if (onChange) {
                onChange(index);
            }
        }}
    >
        <span className='ball__content' style={{ backgroundColor: COLORS[kind] }} />
    </div>
);


export default Ball;
