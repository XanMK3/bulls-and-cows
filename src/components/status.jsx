import React from 'react';
import { GAME_STATUS } from 'const';

const Status = ({ status, attemptsLeft }) => {
    switch (status) {
        case GAME_STATUS.WIN:
            return <span>Win</span>;
        case GAME_STATUS.FAIL:
            return <span>Fail</span>;
        default:
            return (
                <span>
                    {'Attempts left: '}
                    {attemptsLeft}
                </span>
            );
    }
};

export default Status;
