import React from 'react';
import Status from 'components/status';

const Header = ({
    status, attemptsNumber, attempt, toggleMenu,
}) => (
    <header className='game-header'>
        <div className='game-header__stats'>
            <Status status={status} attemptsLeft={attemptsNumber - attempt} />
        </div>
        <button type='button' className='icon' onClick={toggleMenu}>
            <svg className='svg-icon'><use xlinkHref='assets/sprite.svg#menu' /></svg>
        </button>
    </header>
);

export default Header;
