'use strict';

import React, { PureComponent } from 'react';

import { Menu, MenuItem, MenuSeparator, SubMenu } from './menu';
import Tutorial from './tutorial';

const SCREEN_QUERY_LIST_360 = window.matchMedia('(min-width: 360px)');

class GameMenu extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { isTutorialOpen: false };
    }

    toggleTutorial = () => {
        this.setState({ isTutorialOpen: !this.state.isTutorialOpen });
    }

    render() {
        const { isOpen, isGameStarted, close, startNewGame } = this.props;

        return <div>
            <Menu isOpen={isOpen} close={close}>
                {isGameStarted ? <MenuItem handler={close}>
                    Resume game
                </MenuItem> : null}
                <MenuSeparator />
                <MenuItem handler={() => { startNewGame(4); close(); }}>
                    New game - easy
                </MenuItem>
                <MenuItem handler={() => { startNewGame(5); close(); }}>
                    New game - medium
                </MenuItem>
                {SCREEN_QUERY_LIST_360.matches ? <MenuItem handler={() => { startNewGame(6); close(); }}>
                    New game - hard
                </MenuItem> : null}
                <MenuSeparator />
                <MenuItem handler={() => { this.toggleTutorial(); }}>
                    How to play
                </MenuItem>
            </Menu>
            <SubMenu isOpen={this.state.isTutorialOpen} back={this.toggleTutorial}>
                <Tutorial />
            </SubMenu>
        </div>
    }
}

export default GameMenu;
