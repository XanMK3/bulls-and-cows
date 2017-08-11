'use strict';

import React, { Component } from 'react';
import Game from './game';

const DEFAULT_HOLES_NUMBER = 4;

let _id = 0;

class GameManager extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gameId: getUniqueId(),
            secret: getSecret(DEFAULT_HOLES_NUMBER),
            attemptsNumber: DEFAULT_HOLES_NUMBER * 2,
        }

        this.startNewGame = this.startNewGame.bind(this);
    }

    startNewGame(max = DEFAULT_HOLES_NUMBER) {
        this.setState({ gameId: getUniqueId(), secret: getSecret(max), attemptsNumber: max * 2, });
    }

    render() {
        return <Game key={this.state.gameId}
                     secret={this.state.secret} 
                     attemptsNumber={this.state.attemptsNumber}
                     onReset={this.startNewGame} />
    }
}

function getSecret(max) {
    return Array.apply(null, { length: max }).map(() => getRandomInt(0, max - 1));
}

function getUniqueId() {
    return _id++;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default GameManager;
