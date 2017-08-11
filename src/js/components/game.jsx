'use strict';

import React, { Component } from 'react';
import Board from './board';

const GAME_STATUS = {
    PROGRESS: 'progress',
    WIN: 'win',
    LOSING: 'losing',
}

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [],
            currentTry: Array.apply(null, { length: props.secret.length }).map((v, i) => i),
            status: GAME_STATUS.PROGRESS,
        }

        this.change = this.change.bind(this);
        this.submit = this.submit.bind(this);
    }

    change(i) {
        const currentTry = this.state.currentTry.slice();
        currentTry[i] >= this.state.currentTry.length - 1 ? currentTry[i] = 0 : currentTry[i]++;
        this.setState({ currentTry });
    }

    submit() {
        const result = checkResult(this.state.currentTry, this.props.secret);

        if (result.bulls == this.props.secret.length) {
            this.setState({ status: GAME_STATUS.WIN });
        }
        else if (this.state.history.length + 1 == this.props.attemptsNumber) {
            this.setState({ status: GAME_STATUS.LOSING });
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
                return <Board colors={currentTry} onChange={this.change} onSubmit={this.submit} />
            case GAME_STATUS.WIN:
                return (<div className='game-result'>
                    <hr />
                    <p className='game-result__text'>Congratulations, You win!</p>
                    <button className='game-result__button' onClick={e => { onReset() }}>Play Again</button>
                </div>)
            case GAME_STATUS.LOSING:
                return (<div className='game-result'>
                    <hr />
                    <p className='game-result__text'>You lose! Secret is:</p>
                    <Board colors={secret} readOnly={true} />
                    <button className='game-result__button' onClick={e => { onReset() }}>Play Again</button>
                </div>)
            default:
                return <button className='game-result__button' onClick={e => { onReset() }}>Play Again</button>
        }
    }

    render() {
        const { secret } = this.props;
        const { history } = this.state;

        return (
            <div className='game'>
                <h1>Bulls & Cows</h1>
                <hr />
                {history.map((entry, i) => <Board key={i} colors={entry.colors} result={entry.result} readOnly={true} />)}
                {this.renderLastLine()}
            </div>
        )
    }
}

function checkResult(target, secret) {
    const bulls = secret.reduce((sum, v, i) => v === target[i] ? ++sum : sum, 0);

    const sortedSecret = secret.slice().sort((a, b) => a > b).reduce((obj, v) => 
                         (obj[v] > 0 ? obj[v]++ : obj[v] = 1, obj), {})

    const sortedTarget = target.slice().sort((a, b) => a > b).reduce((obj, v) => 
                         (obj[v] > 0 ? obj[v]++ : obj[v] = 1, obj), {})

    const cows = Object.keys(sortedSecret).reduce((matchNumber, key) => 
                 matchNumber += Math.min(sortedSecret[key], sortedTarget[key] || 0), 0) - bulls;

    return { bulls, cows };
}

export default Game;
