import React, {
    memo,
} from 'react';
import {
    Menu,
    MenuGroup,
    MenuItem,
    SubMenu,
} from 'components/menu';
import Tutorial from 'components/tutorial';
import { useToggle } from 'hooks';

const SCREEN_QUERY_LIST_360 = window.matchMedia('(min-width: 360px)');

const GameMenu = memo(({
    isOpen,
    isGameStarted,
    close,
    startNewGame,
}) => {
    const [isTutorialOpen, toggleTutorial] = useToggle(false);

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
                    <MenuItem
                        handler={toggleTutorial}
                    >
                        How to play
                    </MenuItem>
                </MenuGroup>
            </Menu>
            <SubMenu isOpen={isTutorialOpen} back={toggleTutorial}>
                <Tutorial />
            </SubMenu>
        </div>
    );
});

GameMenu.displayName = 'GameMenu';

export default GameMenu;
