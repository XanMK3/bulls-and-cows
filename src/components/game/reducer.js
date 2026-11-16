import produce from 'immer';
import { isEqual } from 'utils';
import { GAME_STATUS } from 'const';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'game:start': {
      const { id, secret } = payload;
      return {
        id,
        status: GAME_STATUS.PROGRESS,
        secret: [...secret],
        history: [],
        activeBoard: Array.from({ length: secret.length }, (v, i) => i),
        attemptsNumber: (2 * secret.length - 4) * 2,
      };
    }
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
        else if (history.length >= attemptsNumber) {
          draft.status = GAME_STATUS.FAIL;
        }
      });
    }

    default:
      throw new Error();
  }
};

export default reducer;
