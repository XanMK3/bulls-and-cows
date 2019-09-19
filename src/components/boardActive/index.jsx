import React, { memo } from 'react';
import Board from 'components/board';
import { useFadeIn } from 'hooks';

const ActiveBoard = memo((props) => {
    const ref = useFadeIn([props.tryNumber]);

    return (
        <div ref={ref}>
            <Board {...props} active />
        </div>
    );
});

export default ActiveBoard;
