import React from 'react';
import cn from 'classnames';

import { COLORS } from 'const';

const Ball = ({
    index, type, readOnly, isDragging, isOver, preview, onChange,
}) => {
    const handler = readOnly
        ? null
        : () => {
            onChange(index);
        };

    return (
        <div
            role='button'
            tabIndex={0}
            className={cn(
                'ball',
                {
                    active: !readOnly,
                    dradding: isDragging,
                    over: isOver,
                    preview,
                },
            )}
            onKeyDown={handler}
            onClick={handler}
        >
            <span className='ball__content' style={{ backgroundColor: COLORS[type] }} />
        </div>
    );
};

export default Ball;
