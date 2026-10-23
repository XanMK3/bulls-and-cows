import React from 'react';
import { GAME_STATUS } from 'const';

const Status = ({ status, attemptsLeft, totalAttempts }) => {
    switch (status) {
        case GAME_STATUS.WIN:
            return (
                <span className='status-badge status-badge--win'>
                    <span className='status-badge__dot' />
                    Victory! 🎉
                </span>
            );
        case GAME_STATUS.FAIL:
            return (
                <span className='status-badge status-badge--fail'>
                    <span className='status-badge__dot' />
                    Game Over
                </span>
            );
        default:
            return (
                <span className='status-badge status-badge--progress'>
                    <span className='status-badge__dot' />
                    <span className='status-badge__label'>Attempts:</span>
                    <strong className='status-badge__count'>
                        {attemptsLeft}
                        {totalAttempts ? ` / ${totalAttempts}` : ''}
                    </strong>
                </span>
            );
    }
};

export default Status;
