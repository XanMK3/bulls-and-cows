'use strict';

import React, { Component } from 'react';
import Game from './game';

import { getId, getRandomArray } from 'js/utils';

const DEFAULT_HOLES_NUMBER = 4;

class GameManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gameId: getId(),
            secret: getRandomArray(DEFAULT_HOLES_NUMBER),
            attemptsNumber: DEFAULT_HOLES_NUMBER * 2,
        }

        this.startNewGame = this.startNewGame.bind(this);
    }

    startNewGame(max = DEFAULT_HOLES_NUMBER) {
        this.setState({ gameId: getId(), secret: getRandomArray(max), attemptsNumber: (2 * max - DEFAULT_HOLES_NUMBER) * 2, });
    }

    render() {
        return <Game key={this.state.gameId}
                     secret={this.state.secret} 
                     attemptsNumber={this.state.attemptsNumber}
                     onReset={this.startNewGame} />
    }
}

export default GameManager;
