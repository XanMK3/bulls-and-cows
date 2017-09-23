'use strict';

import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import TouchBackend from 'react-dnd-touch-backend';
import CustomDragLayer from './CustomDragLayer';

import Header from './header';
import { Board, ActiveBoard } from './board';
import { Win as WinScreen, Fail as FailScreen } from './gameEndScreen';

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
                return <ActiveBoard guess={currentTry} tryNumber={this.state.history.length}
                    onChange={this.change} onSwap={this.swap} onSubmit={this.submit} />
            case GAME_STATUS.WIN:
                return <WinScreen secret={secret} restart={onReset} />;
            case GAME_STATUS.FAIL:
                return <FailScreen secret={secret} restart={onReset} />;
        }
    }

    render() {
        const { onReset, toggleMenu } = this.props;
        const { secret, history, attemptsNumber, status } = this.state;

        return (
            <div className='game'>
                <Header status={status} attemptsNumber={attemptsNumber} attempt={history.length} toggleMenu={toggleMenu} />
                {history.map((entry, i) => <Board key={i} secret={secret} guess={entry} />)}
                {this.renderLastLine()}
                <CustomDragLayer />
            </div>
        )
    }
}

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(Game);
