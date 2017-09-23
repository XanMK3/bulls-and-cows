'use strict';

import React, { PureComponent } from 'react';

import Board from './board';

import { checkSmoothScrollSupport } from 'js/utils';

const isSmoothScrollSupported = checkSmoothScrollSupport();
const FADE_TIMEOUT = 400;

class ActiveBoard extends PureComponent {
    componentDidUpdate(prevProps) {
        if (prevProps.tryNumber != this.props.tryNumber) {
            this.fadeIn();
            this.scrollIntoView();
        }
    }

    fadeIn() {
        this.node.classList.add('fade-in');
        setTimeout(() => { this.node.classList.remove('fade-in') }, FADE_TIMEOUT);
    }

    scrollIntoView() {
        if (!isSmoothScrollSupported) return;
        this.node.scrollIntoView({ behavior: 'smooth' });
    }

    render() {
        return (
            <div className='active-board' ref={(node) => { this.node = node; }}>
                <Board {...this.props} active />
            </div>
        )
    }
}

export default ActiveBoard;
