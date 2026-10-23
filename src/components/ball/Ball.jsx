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
            'ball',
            typeof kind === 'number' && `ball--color-${kind}`,
            {
                active,
                preview,
                dradding: isDragging,
                over: isOver,
            },
        )}
        style={{
            '--ball-color': typeof kind === 'number' ? `var(--ball-${kind})` : undefined,
        }}
        onClick={() => {
            if (onChange) {
                onChange(index);
            }
        }}
    >
        <span
            className='ball__content'
            style={{
                backgroundColor: typeof kind === 'number' ? `var(--ball-${kind}, ${COLORS[kind]})` : undefined,
            }}
        />
    </div>
);

export default Ball;
