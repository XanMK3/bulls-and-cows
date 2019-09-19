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

    return (
        <div
            ref={(node) => {
                if (!readOnly) {
                    return dragSource(dropTarget(node));
                }
                return null;
            }}
        >
            <Ball
                index={index}
                kind={kind}
                active={!readOnly}
                isDragging={isDragging}
                isOver={isOver}
                onChange={!readOnly && onChange}
            />
        </div>
    );
};

export default DraggableBall;
