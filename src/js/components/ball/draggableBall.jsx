'use strict';

import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import cn from 'classnames';

import Ball from './ball';

import { ITEM_TYPES } from 'js/const';

const dragSource = {
    beginDrag(props) {
        return {
            index: props.index,
            type: props.type,
        };
    }
};

const dropTarget = {
    drop(props, monitor, component) {
        const dragIndex = monitor.getItem().index, dropIndex = props.index;

        if (dragIndex !== dropIndex) props.onSwap(dragIndex, dropIndex);
    }
};

function collectSource(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
};

function collectTarget(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
};

function render(props) {
    const { connectDragSource, connectDropTarget } = props;
    return props.readOnly ? <Ball {...props} /> : connectDragSource(connectDropTarget(<div><Ball {...props} /></div>));
}

export default DragSource(ITEM_TYPES.BALL, dragSource, collectSource)(DropTarget(ITEM_TYPES.BALL, dropTarget, collectTarget)(render));
