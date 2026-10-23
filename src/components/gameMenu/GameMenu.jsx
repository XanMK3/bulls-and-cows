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
import { useToggle, useMediaQuery } from 'hooks';

const GameMenu = memo(({
    isOpen,
    isGameStarted,
    close,
    startNewGame,
    theme,
    toggleTheme,
}) => {
    const [isTutorialOpen, toggleTutorial] = useToggle(false);
    const isWideScreen = useMediaQuery('(min-width: 360px)');

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
                    {isWideScreen && (
                        <MenuItem handler={() => {
                            startNewGame(6);
                            close();
                        }}
                        >
                            New game - hard
                        </MenuItem>
                    )}
                </MenuGroup>
                {toggleTheme && (
                    <MenuGroup>
                        <MenuItem handler={toggleTheme}>
                            {theme === 'dark' ? 'Theme: 🌙 Dark' : 'Theme: ☀️ Light'}
                        </MenuItem>
                    </MenuGroup>
                )}
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
