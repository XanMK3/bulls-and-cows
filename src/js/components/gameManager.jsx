'use strict';

import React, { Component } from 'react';

import { Menu, MenuItem } from './menu';
import Game from './game';

import { getId, getRandomArray } from 'js/utils';

const DEFAULT_HOLES_NUMBER = 4;
const SCREEN_QUERY_LIST_360 = window.matchMedia('(min-width: 360px)');

class GameManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: null,
            menuOpen: true,
        }
    }

    startNewGame = (max = DEFAULT_HOLES_NUMBER) => {
        this.setState({
            game: { key: getId(), secret: getRandomArray(max), attemptsNumber: (2 * max - DEFAULT_HOLES_NUMBER) * 2, }
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
                {this.state.game != null ? <Game {...this.state.game} onReset={this.startNewGame} toggleMenu={this.toggleMenu} /> : null}
            </main>
            <Menu open={this.state.menuOpen} allowClose={this.state.game != null} close={this.closeMenu}>
                <MenuItem handler={() => { this.startNewGame(4) }}>
                    <div>New game - easy</div>
                </MenuItem>
                <MenuItem handler={() => { this.startNewGame(5) }}>
                    <div>New game - medium</div>
                </MenuItem>
                {SCREEN_QUERY_LIST_360.matches ? <MenuItem handler={() => { this.startNewGame(6) }}>
                    <div>New game - hard</div>
                </MenuItem> : null}
            </Menu>
        </div>
    }
}

export default GameManager;
