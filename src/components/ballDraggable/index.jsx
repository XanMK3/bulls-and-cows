import React from 'react';
import {
    useDrag,
    useDrop,
} from 'react-dnd';
import Ball from 'components/ball';
import { ITEM_TYPES } from 'const';

function collectSource(monitor) {
    return {
        isDragging: monitor.isDragging(),
    };
}

function collectTarget(monitor) {
    return {
        isOver: monitor.isOver(),
    };
}

const DraggableBall = ({
    index,
    kind,
    readOnly,
    onSwap,
    onChange,
}) => {
    const [{ isDragging }, dragSource] = useDrag({
        item: { type: ITEM_TYPES.BALL, kind, index },
        collect: collectSource,
    });

    const [{ isOver }, dropTarget] = useDrop({
        accept: ITEM_TYPES.BALL,
        drop: (props) => {
            const sourceIndex = props.index;
            const targetIndex = index;
            if (sourceIndex !== targetIndex) onSwap(sourceIndex, targetIndex);
        },
        collect: collectTarget,
    });

    if (readOnly) {
        return (
            <Ball
                index={index}
                kind={kind}
                readOnly={readOnly}
                isDragging={isDragging}
                isOver={isOver}
                onChange={onChange}
            />
        );
    }

    return (
        <div ref={(node) => dragSource(dropTarget(node))}>
            <Ball
                index={index}
                kind={kind}
                readOnly={readOnly}
                isDragging={isDragging}
                isOver={isOver}
                onChange={onChange}
            />
        </div>
    );
};

export default DraggableBall;
