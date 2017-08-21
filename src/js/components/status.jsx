'use strict';

import React from 'react';

import { GAME_STATUS } from 'js/const';

function Status({ status, attemptsLeft }) {
    switch (status) {
        case GAME_STATUS.PROGRESS:
            return <span>Attempts left: {attemptsLeft}</span>
        case GAME_STATUS.WIN:
            return <span>Win</span>
        case GAME_STATUS.FAIL:
            return <span>Fail</span>
    }
}

export default Status;
