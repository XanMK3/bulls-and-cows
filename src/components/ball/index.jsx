import React from 'react';
import cn from 'classnames';
import { COLORS } from 'const';
import './style';

const Ball = ({
    index, type, readOnly, isDragging, isOver, preview, onChange,
}) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
        className={cn(
            'ball',
            {
                active: !readOnly,
                dradding: isDragging,
                over: isOver,
                preview,
            },
        )}
        onClick={readOnly
            ? null
            : () => {
                onChange(index);
            }}
    >
        <span className='ball__content' style={{ backgroundColor: COLORS[type] }} />
    </div>
);


export default Ball;
