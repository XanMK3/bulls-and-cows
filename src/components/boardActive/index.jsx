import React, { memo } from 'react';
import fadeIn from 'components/fadeInHoc';
import Board from 'components/board';

const ActiveBoard = memo(props => (
    <Board {...props} active />
));

export default fadeIn(ActiveBoard, (prevProps, prevState, nextProps) => (
    prevProps.tryNumber !== nextProps.tryNumber
));
