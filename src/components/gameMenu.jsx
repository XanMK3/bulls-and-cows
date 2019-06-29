import React, { PureComponent } from 'react';
import {
    Menu, MenuGroup, MenuItem, SubMenu,
} from 'components/menu';
import Tutorial from 'components/tutorial';

const SCREEN_QUERY_LIST_360 = window.matchMedia('(min-width: 360px)');

class GameMenu extends PureComponent {
    state = {
        isTutorialOpen: false,
    }

    toggleTutorial = () => {
        const { isTutorialOpen } = this.state;
        this.setState({ isTutorialOpen: !isTutorialOpen });
    }

    render() {
        const {
            isOpen, isGameStarted, close, startNewGame,
        } = this.props;
        const { isTutorialOpen } = this.state;

        return (
            <div>
                <Menu isOpen={isOpen} close={close}>
                    {isGameStarted && (
                        <MenuGroup>
                            <MenuItem handler={close}>
                                Resume game
                            </MenuItem>
                        </MenuGroup>
                    )}
                    <MenuGroup>
                        <MenuItem handler={() => {
                            startNewGame(4);
                            close();
                        }}
                        >
                            New game - easy
                        </MenuItem>
                        <MenuItem handler={() => {
                            startNewGame(5);
                            close();
                        }}
                        >
                            New game - medium
                        </MenuItem>
                        {SCREEN_QUERY_LIST_360.matches && (
                            <MenuItem handler={() => {
                                startNewGame(6);
                                close();
                            }}
                            >
                                New game - hard
                            </MenuItem>
                        )}
                    </MenuGroup>
                    <MenuGroup>
                        <MenuItem handler={() => {
                            this.toggleTutorial();
                        }}
                        >
                            How to play
                        </MenuItem>
                    </MenuGroup>
                </Menu>
                <SubMenu isOpen={isTutorialOpen} back={this.toggleTutorial}>
                    <Tutorial />
                </SubMenu>
            </div>
        );
    }
}

export default GameMenu;
