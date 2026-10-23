import React from 'react';
import Status from 'components/status';

const Header = ({
    status,
    attemptsNumber,
    attempt,
    toggleMenu,
    theme,
    toggleTheme,
}) => (
    <header className='game-header'>
        <div className='game-header__stats'>
            <Status
                status={status}
                attemptsLeft={attemptsNumber - attempt}
                totalAttempts={attemptsNumber}
            />
        </div>
        <div className='game-header__actions'>
            {toggleTheme && (
                <button
                    type='button'
                    className='icon icon--theme'
                    onClick={toggleTheme}
                    title={theme === 'dark' ? 'Switch to Light theme' : 'Switch to Dark theme'}
                    aria-label='Toggle theme'
                >
                    <svg className='svg-icon'>
                        <use xlinkHref={theme === 'dark' ? 'assets/sprite.svg#sun' : 'assets/sprite.svg#moon'} />
                    </svg>
                </button>
            )}
            <button
                type='button'
                className='icon'
                onClick={toggleMenu}
                title='Menu'
                aria-label='Open menu'
            >
                <svg className='svg-icon'>
                    <use xlinkHref='assets/sprite.svg#menu' />
                </svg>
            </button>
        </div>
    </header>
);

export default Header;
