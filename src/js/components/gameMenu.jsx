'use strict';

import React, { PureComponent } from 'react';

import { Menu, MenuItem, MenuSeparator } from './menu';

const SCREEN_QUERY_LIST_360 = window.matchMedia('(min-width: 360px)');

class GameMenu extends PureComponent {
    render() {
        const { isOpen, isGameStarted, close, startNewGame } = this.props;

        return <Menu open={isOpen} allowClose={isGameStarted} close={close}>
            {isGameStarted ? <MenuItem handler={close}>
                Resume game
            </MenuItem> : null}
            <MenuSeparator />
            <MenuItem handler={() => { startNewGame(4) }}>
                New game - easy
            </MenuItem>
            <MenuItem handler={() => { startNewGame(5) }}>
                New game - medium
            </MenuItem>
            {SCREEN_QUERY_LIST_360.matches ? <MenuItem handler={() => { startNewGame(6) }}>
                New game - hard
            </MenuItem> : null}
        </Menu>
    }
}

export default GameMenu;
