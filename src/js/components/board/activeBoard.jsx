'use strict';

import React, { PureComponent } from 'react';

import Board from './board';

import fadeIn from '../fadeInHOC';

class ActiveBoard extends PureComponent {
    render() {
        return <Board {...this.props} active />;
    }
}

export default fadeIn(ActiveBoard, (prevProps, prevState, nextProps, nextState) => {
    return prevProps.tryNumber != nextProps.tryNumber;
});
