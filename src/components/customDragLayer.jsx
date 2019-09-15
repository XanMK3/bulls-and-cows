import React from 'react';
import { useDragLayer } from 'react-dnd';
import Ball from 'components/ball';
import { ITEM_TYPES } from 'const';

const collect = (monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    isDragging: monitor.isDragging(),
    didDrop: monitor.didDrop(),
});

const getItemStyles = ({ x, y }) => ({ transform: `translate(${x}px,${y}px)` });

const renderItem = (type, item) => {
    switch (type) {
        case ITEM_TYPES.BALL:
            return <Ball kind={item.kind} readOnly preview />;
        default:
            return null;
    }
};

const CustomDragLayer = () => {
    const {
        item,
        itemType,
        currentOffset,
        isDragging,
        didDrop,
    } = useDragLayer(collect);

    if (!isDragging || didDrop) return null;

    return (
        <div className='custom-drag-layer'>
            <div style={getItemStyles(currentOffset)}>
                {renderItem(itemType, item)}
            </div>
        </div>
    );
};

export default CustomDragLayer;
