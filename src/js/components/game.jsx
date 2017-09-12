'use strict';

import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import TouchBackend from 'react-dnd-touch-backend';
import CustomDragLayer from './CustomDragLayer';

import Header from './header';
import Board from './board';

import { getRandomArray, isEqual } from 'js/utils';

import { GAME_STATUS } from 'js/const';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secret: getRandomArray(props.numberOfHoles),
            history: [],
            currentTry: Array.apply(null, { length: props.numberOfHoles }).map((v, i) => i),
            attemptsNumber: (2 * props.numberOfHoles - 4) * 2,
            status: GAME_STATUS.PROGRESS,
        }
    }

    change = (i) => {
        const currentTry = this.state.currentTry.slice();
        currentTry[i] >= this.state.currentTry.length - 1 ? currentTry[i] = 0 : currentTry[i]++;
        this.setState({ currentTry });
    }

    swap = (i1, i2) => {
        const currentTry = this.state.currentTry.slice();
        [currentTry[i1], currentTry[i2]] = [currentTry[i2], currentTry[i1]];
        this.setState({ currentTry });
    }

    submit = () => {
        const equal = isEqual(this.state.currentTry, this.state.secret);

        if (equal) {
            this.setState({ status: GAME_STATUS.WIN });
        }
        else if (this.state.history.length + 1 == this.state.attemptsNumber) {
            this.setState({ status: GAME_STATUS.FAIL });
        }

        const history = this.state.history.slice();
        history.push(this.state.currentTry.slice());
        this.setState({ history });
    }

    renderLastLine() {
        const { onReset } = this.props;
        const { secret, currentTry, status } = this.state;

        switch (status) {
            case GAME_STATUS.PROGRESS:
                return <Board try={currentTry} onChange={this.change} onSwap={this.swap} onSubmit={this.submit} />
            case GAME_STATUS.WIN:
                return (<div className='game-result'>
                    <hr />
                    <p className='game-result__text'>Congratulations, You win!</p>
                    <div className='btn-block'>
                        <button type='button' className='btn-block__button' onClick={e => { onReset(secret.length) }}>Play again</button>
                    </div>
                </div>)
            case GAME_STATUS.FAIL:
                return (<div className='game-result'>
                    <hr />
                    <p className='game-result__text'>You lose! Secret is:</p>
                    <Board try={secret} readOnly={true} />
                    <div className='btn-block'>
                        <button type='button' className='btn-block__button' onClick={e => { onReset(secret.length) }}>Play again</button>
                    </div>
                </div>)
        }
    }

    render() {
        const { onReset, toggleMenu } = this.props;
        const { secret, history, attemptsNumber, status } = this.state;

        return (
            <div className='game'>
                <Header status={status} attemptsNumber={attemptsNumber} attempt={history.length} toggleMenu={toggleMenu} />
                {history.map((entry, i) => <Board key={i} secret={secret} try={entry} readOnly={true} />)}
                {this.renderLastLine()}
                <CustomDragLayer />
            </div>
        )
    }
}

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(Game);
