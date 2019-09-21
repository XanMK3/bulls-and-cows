import React, {
    useState,
    useCallback,
} from 'react';
import Game from 'components/game';
import GameMenu from 'components/gameMenu';
import { useToggle } from 'hooks';
import { getId } from 'utils';

const DEFAULT_HOLES_NUMBER = 4;

const SceneManager = () => {
    const [isMenuOpen, toggleMenu] = useToggle(true);
    const [game, setGame] = useState(null);
    const startNewGame = useCallback((max = DEFAULT_HOLES_NUMBER) => {
        setGame({
            key: getId(),
            numberOfHoles: max,
        });
    }, []);

    return (
        <div>
            <main className='main'>
                {game && (
                    <Game
                        {...game}
                        restart={startNewGame}
                        toggleMenu={toggleMenu}
                    />
                )}
            </main>
            <GameMenu
                isOpen={isMenuOpen}
                isGameStarted={game != null}
                close={toggleMenu}
                startNewGame={startNewGame}
            />
        </div>
    );
};

export default SceneManager;
