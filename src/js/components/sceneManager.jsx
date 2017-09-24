'use strict';

import React, { Component } from 'react';

import Game from './game';
import GameMenu from './gameMenu';

import { getId } from 'js/utils';

const DEFAULT_HOLES_NUMBER = 4;
const SCREEN_QUERY_LIST_360 = window.matchMedia('(min-width: 360px)');

class SceneManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: null,
            menuOpen: true,
        }
    }

    startNewGame = (max = DEFAULT_HOLES_NUMBER) => {
        this.setState({
            game: { key: getId(), numberOfHoles: max }
        });
    }

    toggleMenu = () => {
        this.setState({ menuOpen: !this.state.menuOpen });
    }

    closeMenu = () => {
        this.setState({ menuOpen: false });
    }

    render() {
        return <div>
            <main className='main'>
                {this.state.game != null ? <Game {...this.state.game} restart={this.startNewGame} toggleMenu={this.toggleMenu} /> : null}
            </main>
            <GameMenu isOpen={this.state.menuOpen} isGameStarted={this.state.game != null} close={this.closeMenu} startNewGame={this.startNewGame} />
        </div>
    }
}

export default SceneManager;
