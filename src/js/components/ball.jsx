'use strict';

import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import cn from 'classnames';

import { COLORS, ITEM_TYPES } from 'js/const';

const dragSource = {
    beginDrag(props) {
        return {
            index: props.index
        };
    }
};

const dropTarget = {
    drop(props, monitor, component) {
        const dragIndex = monitor.getItem().index, hoverIndex = props.index;

        if (dragIndex === hoverIndex) return;

        props.onSwap(monitor.getItem().index, props.index);
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

function Ball(props) {
    const { connectDragSource, connectDropTarget } = props;

    return props.readOnly ? render(props) : connectDragSource(connectDropTarget(render(props)));
}

function render(props) {
    return <div className={cn('ball', { active: !props.readOnly, dradding: props.isDragging, over: props.isOver })}
        onClick={props.readOnly ? null : e => { props.onChange(props.index) }}>
        <span className='ball__content' style={{ backgroundColor: COLORS[props.type] }}></span>
    </div>;
}

export default DragSource(ITEM_TYPES.BALL, dragSource, collectSource)(DropTarget(ITEM_TYPES.BALL, dropTarget, collectTarget)(Ball));
