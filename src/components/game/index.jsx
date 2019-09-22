import React, {
    useReducer,
} from 'react';
import { DndProvider } from 'react-dnd';
import TouchBackend from 'react-dnd-touch-backend';
import CustomDragLayer from 'components/customDragLayer';
import Header from 'components/gameHeader';
import { Win as WinScreen, Fail as FailScreen } from 'components/gameEndScreen';
import Board from 'components/board';
import ActiveBoard from 'components/boardActive';
import { getRandomArray } from 'utils';
import { GAME_STATUS } from 'const';
import reducer from './reducer';
import './style';

const getInitialState = (length) => ({
    status: GAME_STATUS.PROGRESS,
    secret: getRandomArray(length),
    history: [],
    activeBoard: Array.from({ length }).map((v, i) => i),
    attemptsNumber: (2 * length - 4) * 2,
});

const Game = ({
    secretLength,
    toggleMenu,
    restart,
}) => {
    const [state, dispatch] = useReducer(reducer, secretLength, getInitialState);
    const {
        status,
        secret,
        history,
        activeBoard,
        attemptsNumber,
    } = state;

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
                {history.map((data, i) => <Board key={i} secret={secret} data={data} />)}
                {status === GAME_STATUS.PROGRESS && (
                    <ActiveBoard
                        data={activeBoard}
                        tryNumber={history.length}
                        onChange={(index) => dispatch({ type: 'ball:change', payload: { index } })}
                        onSwap={(index1, index2) => dispatch({ type: 'ball:swap', payload: { index1, index2 } })}
                        onSubmit={() => dispatch({ type: 'board:submit' })}
                    />
                )}
                {status === GAME_STATUS.WIN && <WinScreen secret={secret} restart={restart} />}
                {status === GAME_STATUS.FAIL && <FailScreen secret={secret} restart={restart} />}
                <CustomDragLayer />
            </div>
        </DndProvider>
    );
};

export default Game;
