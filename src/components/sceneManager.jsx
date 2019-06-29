import React, { Component } from 'react';
import Game from 'components/game';
import GameMenu from 'components/gameMenu';
import { getId } from 'utils';

const DEFAULT_HOLES_NUMBER = 4;

class SceneManager extends Component {
    state = {
        game: null,
        isMenuOpen: true,
    }

    startNewGame = (max = DEFAULT_HOLES_NUMBER) => {
        this.setState({
            game: {
                key: getId(),
                numberOfHoles: max,
            },
        });
    }

    toggleMenu = () => {
        const { isMenuOpen } = this.state;
        this.setState({ isMenuOpen: !isMenuOpen });
    }

    closeMenu = () => {
        this.setState({ isMenuOpen: false });
    }

    render() {
        const { game, isMenuOpen } = this.state;

        return (
            <div>
                <main className='main'>
                    {game != null
                        ? (
                            <Game
                                {...game}
                                restart={this.startNewGame}
                                toggleMenu={this.toggleMenu}
                            />
                        )
                        : null
                    }
                </main>
                <GameMenu
                    isOpen={isMenuOpen}
                    isGameStarted={game != null}
                    close={this.closeMenu}
                    startNewGame={this.startNewGame}
                />
            </div>
        );
    }
}

export default SceneManager;
