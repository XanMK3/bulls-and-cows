import produce from 'immer';
import { isEqual } from 'utils';
import { GAME_STATUS } from 'const';

const reducer = (state, { type, payload }) => {
    switch (type) {
        case 'ball:change': {
            const { index } = payload;

            return produce(state, (draft) => {
                const { secret: { length } } = draft;
                if (draft.activeBoard[index] >= length - 1) {
                    draft.activeBoard[index] = 0;
                }
                else {
                    draft.activeBoard[index]++;
                }
            });
        }
        case 'ball:swap': {
            const { index1, index2 } = payload;

            return produce(state, (draft) => {
                const { activeBoard: board } = draft;
                [board[index1], board[index2]] = [board[index2], board[index1]];
            });
        }
        case 'board:submit': {
            return produce(state, (draft) => {
                const {
                    activeBoard,
                    secret,
                    history,
                    attemptsNumber,
                } = draft;

                draft.history.push([...activeBoard]);

                if (isEqual(activeBoard, secret)) {
                    draft.status = GAME_STATUS.WIN;
                }
                else if (history.length + 1 === attemptsNumber) {
                    draft.status = GAME_STATUS.FAIL;
                }
            });
        }

        default:
            throw new Error();
    }
};

export default reducer;
