'use strict';

import React, { Component } from 'react';
import { DragLayer } from 'react-dnd';

import Ball from './ball';

import { ITEM_TYPES } from 'js/const';

function getItemStyles(props) {
    const { initialOffset, currentOffset } = props;
    return { transform: `translate(${currentOffset.x}px,${currentOffset.y}px)` };
}

function collect(monitor) {
    return {
        item: monitor.getItem(),
        itemType: monitor.getItemType(),
        currentOffset: monitor.getSourceClientOffset(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        isDragging: monitor.isDragging(),
        didDrop: monitor.didDrop(),
    };
}

class CustomDragLayer extends Component {
    renderItem(type, item) {
        switch (type) {
            case ITEM_TYPES.BALL:
                return <Ball type={item.type} readOnly preview />;
            default:
                return null;
        }
    }

    render() {
        const { item, itemType, isDragging, didDrop } = this.props;

        if (!isDragging || didDrop) return null;

        return (
            <div className='custom-drag-layer'>
                <div style={getItemStyles(this.props)}>
                    {this.renderItem(itemType, item)}
                </div>
            </div>
        );
    }
}

export default DragLayer(collect)(CustomDragLayer);
