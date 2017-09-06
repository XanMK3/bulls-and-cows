'use strict';

import React from 'react';

import Status from './status';

function Header({ status, attemptsNumber, attempt, toggleMenu }) {
    return (
        <header className='game-header'>
            <div className='game-header__stats'>
                <Status status={status} attemptsLeft={attemptsNumber - attempt} />
            </div>
            <button type='button' className='icon' onClick={toggleMenu}>
                <svg className='svg-icon'><use xlinkHref="assets/sprite.svg#menu"></use></svg>
            </button>
        </header>
    )
}

export default Header;
