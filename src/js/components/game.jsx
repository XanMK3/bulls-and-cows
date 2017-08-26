'use strict';

import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import TouchBackend from 'react-dnd-touch-backend';
import CustomDragLayer from './CustomDragLayer';

import Board from './board';
import Header from './header';

import { countMatchElements } from 'js/utils';

import { GAME_STATUS } from 'js/const';

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [],
            currentTry: Array.apply(null, { length: props.secret.length }).map((v, i) => i),
            status: GAME_STATUS.PROGRESS,
        }

        this.change = this.change.bind(this);
        this.swap = this.swap.bind(this);
        this.submit = this.submit.bind(this);
    }

    change(i) {
        const currentTry = this.state.currentTry.slice();
        currentTry[i] >= this.state.currentTry.length - 1 ? currentTry[i] = 0 : currentTry[i]++;
        this.setState({ currentTry });
    }

    swap(i1, i2) {
        const currentTry = this.state.currentTry.slice();
        [currentTry[i1], currentTry[i2]] = [currentTry[i2], currentTry[i1]];
        this.setState({ currentTry });
    }

    submit() {
        const result = countMatchElements(this.state.currentTry, this.props.secret);

        if (result.exactMatch == this.props.secret.length) {
            this.setState({ status: GAME_STATUS.WIN });
        }
        else if (this.state.history.length + 1 == this.props.attemptsNumber) {
            this.setState({ status: GAME_STATUS.FAIL });
        }

        const history = this.state.history.slice();
        history.push({ colors: this.state.currentTry.slice(), result: result });
        this.setState({ history });
    }

    renderLastLine() {
        const { secret, onReset } = this.props;
        const { currentTry, status } = this.state;

        switch (status) {
            case GAME_STATUS.PROGRESS:
                return <Board colors={currentTry} onChange={this.change} onSwap={this.swap} onSubmit={this.submit} />
            case GAME_STATUS.WIN:
                return (<div className='game-result'>
                    <hr />
                    <p className='game-result__text'>Congratulations, You win!</p>
                    <div className='btn-block'>
                        <button type='button' className='btn-block__button' onClick={e => { onReset(4) }}>New game (easy)</button>
                        <button type='button' className='btn-block__button' onClick={e => { onReset(5) }}>New game (hard)</button>
                    </div>
                </div>)
            case GAME_STATUS.FAIL:
                return (<div className='game-result'>
                    <hr />
                    <p className='game-result__text'>You lose! Secret is:</p>
                    <Board colors={secret} readOnly={true} />
                    <div className='btn-block'>
                        <button type='button' className='btn-block__button' onClick={e => { onReset(4) }}>New game (easy)</button>
                        <button type='button' className='btn-block__button' onClick={e => { onReset(5) }}>New game (hard)</button>
                    </div>
                </div>)
        }
    }

    render() {
        const { secret } = this.props;
        const { history, status } = this.state;

        return (
            <div className='game'>
                <Header status={status} attemptsNumber={this.props.attemptsNumber} attempt={history.length} />
                <main>
                    {history.map((entry, i) => <Board key={i} colors={entry.colors} result={entry.result} readOnly={true} />)}
                    {this.renderLastLine()}
                </main>
                <CustomDragLayer />
            </div>
        )
    }
}

export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(Game);
