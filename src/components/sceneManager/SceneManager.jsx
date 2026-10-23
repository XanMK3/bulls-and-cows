import React, {
    useState,
    useCallback,
} from 'react';
import { DndProvider } from 'react-dnd';
import TouchBackend from 'react-dnd-touch-backend';
import Game from 'components/game';
import GameMenu from 'components/gameMenu';
import { useToggle, useTheme } from 'hooks';
import { getId } from 'utils';

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
        <DndProvider backend={TouchBackend} options={dndOptions}>
            <div>
                <main className='main'>
                    {game && (
                        <Game
                            {...game}
                            restart={startNewGame}
                            toggleMenu={toggleMenu}
                            theme={theme}
                            toggleTheme={toggleTheme}
                        />
                    )}
                </main>
                <GameMenu
                    isOpen={isMenuOpen}
                    isGameStarted={game != null}
                    close={toggleMenu}
                    startNewGame={startNewGame}
                    theme={theme}
                    toggleTheme={toggleTheme}
                />
            </div>
        </DndProvider>
    );
};

export default SceneManager;
