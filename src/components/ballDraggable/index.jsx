import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import Ball from 'components/ball';
import { ITEM_TYPES } from 'const';

const dragSource = {
    beginDrag(props) {
        return {
            index: props.index,
            type: props.type,
        };
    },
};

const dropTarget = {
    drop(props, monitor) {
        const dragIndex = monitor.getItem().index;
        const dropIndex = props.index;
        if (dragIndex !== dropIndex) props.onSwap(dragIndex, dropIndex);
    },
};

function collectSource(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
}

function collectTarget(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    };
}

const DraggableBall = ({
    connectDragSource, connectDropTarget, readOnly, ...otherProps
}) => (readOnly
    ? <Ball readOnly={readOnly} {...otherProps} />
    : connectDragSource(connectDropTarget(<div><Ball readOnly={readOnly} {...otherProps} /></div>))
);

const dndSource = DragSource(ITEM_TYPES.BALL, dragSource, collectSource);
const dndTarget = DropTarget(ITEM_TYPES.BALL, dropTarget, collectTarget);
export default dndSource(dndTarget(DraggableBall));
