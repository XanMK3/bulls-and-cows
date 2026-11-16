import React, {
  useReducer,
  useCallback,
} from 'react';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import CustomDragLayer from 'components/customDragLayer';
import Game from 'components/game';
import GameMenu from 'components/gameMenu';
import { useToggle, useTheme } from 'hooks';
import { getId, getRandomArray } from 'utils';
import reducer from 'components/game/reducer';
import './style';

const dndOptions = { enableMouseEvents: true };

const SceneManager = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, toggleMenu] = useToggle(true);
  const [game, dispatch] = useReducer(reducer, null);

  const startNewGame = useCallback((max) => {
    dispatch({
      type: 'game:start',
      payload: { id: getId(), secret: getRandomArray(max) },
    });
  }, []);

  return (
    <div>
      <DndProvider backend={TouchBackend} options={dndOptions}>
        {game && (
          <Game
            state={game}
            dispatch={dispatch}
            restart={startNewGame}
            toggleMenu={toggleMenu}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        )}
        <CustomDragLayer />
      </DndProvider>
      <GameMenu
        isOpen={isMenuOpen}
        isGameStarted={game != null}
        close={toggleMenu}
        startNewGame={startNewGame}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </div>
  );
};

export default SceneManager;
