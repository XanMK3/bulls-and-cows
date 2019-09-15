import React, { Component } from 'react';
import { DndProvider } from 'react-dnd';
import TouchBackend from 'react-dnd-touch-backend';
import CustomDragLayer from 'components/customDragLayer';
import Header from 'components/gameHeader';
import { Win as WinScreen, Fail as FailScreen } from 'components/gameEndScreen';
import Board from 'components/board';
import ActiveBoard from 'components/boardActive';
import { getRandomArray, isEqual } from 'utils';
import { GAME_STATUS } from 'const';
import './style';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secret: getRandomArray(props.numberOfHoles),
            history: [],
            currentTry: Array.from({ length: props.numberOfHoles }).map((v, i) => i),
            attemptsNumber: (2 * props.numberOfHoles - 4) * 2,
            status: GAME_STATUS.PROGRESS,
        };
    }

    change = (i) => {
        const { numberOfHoles } = this.props;
        const { currentTry } = this.state;
        const newTry = [...currentTry];

        if (newTry[i] >= numberOfHoles - 1) {
            newTry[i] = 0;
        }
        else {
            newTry[i]++;
        }

        this.setState({ currentTry: newTry });
    }

    swap = (i1, i2) => {
        const { currentTry } = this.state;
        const newTry = [...currentTry];

        [newTry[i1], newTry[i2]] = [newTry[i2], newTry[i1]];

        this.setState({ currentTry: newTry });
    }

    submit = () => {
        const {
            currentTry, secret, history, attemptsNumber,
        } = this.state;

        if (isEqual(currentTry, secret)) {
            this.setState({ status: GAME_STATUS.WIN });
        }
        else if (history.length + 1 === attemptsNumber) {
            this.setState({ status: GAME_STATUS.FAIL });
        }

        const newHistory = [...history, currentTry];
        this.setState({ history: newHistory });
    }

    renderLastLine() {
        const { restart } = this.props;
        const {
            secret, history, currentTry, status,
        } = this.state;

        switch (status) {
            case GAME_STATUS.WIN:
                return <WinScreen secret={secret} restart={restart} />;
            case GAME_STATUS.FAIL:
                return <FailScreen secret={secret} restart={restart} />;
            default:
                return (
                    <ActiveBoard
                        guess={currentTry}
                        tryNumber={history.length}
                        onChange={this.change}
                        onSwap={this.swap}
                        onSubmit={this.submit}
                    />
                );
        }
    }

    render() {
        const { toggleMenu } = this.props;
        const {
            secret, history, attemptsNumber, status,
        } = this.state;

        return (
            <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
                <div className='game'>
                    <Header
                        status={status}
                        attemptsNumber={attemptsNumber}
                        attempt={history.length}
                        toggleMenu={toggleMenu}
                    />
                    {/* eslint-disable-next-line react/no-array-index-key */}
                    {history.map((entry, i) => <Board key={i} secret={secret} guess={entry} />)}
                    {this.renderLastLine()}
                    <CustomDragLayer />
                </div>
            </DndProvider>
        );
    }
}

export default Game;
