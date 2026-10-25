import React, {
  useState,
  useCallback,
} from 'react';
import { DndProvider } from 'react-dnd';
import TouchBackend from 'react-dnd-touch-backend';
import CustomDragLayer from 'components/customDragLayer';
import Game from 'components/game';
import GameMenu from 'components/gameMenu';
import { useToggle, useTheme } from 'hooks';
import { getId } from 'utils';
import './style';

const dndOptions = { enableMouseEvents: true };

const SceneManager = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, toggleMenu] = useToggle(true);
  const [game, setGame] = useState(null);
  const startNewGame = useCallback((max) => {
    setGame({
      key: getId(),
      secretLength: max,
    });
  }, []);

  return (
    <div>
      <DndProvider backend={TouchBackend} options={dndOptions}>
        {game && (
          <Game
            {...game}
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
