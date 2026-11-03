import React, { memo } from 'react';
import Board from 'components/board';
import { useFadeIn } from 'hooks';

const ActiveBoard = memo((props) => {
  const ref = useFadeIn(props.tryNumber);

  return (
    <Board ref={ref} {...props} active />
  );
});

ActiveBoard.displayName = 'ActiveBoard';

export default ActiveBoard;
