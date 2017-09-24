'use strict';

import React from 'react';

function Tutorial(props) {
    return <div className='tutorial'>
        <p>Your goal is to guess a secret combination of colored balls, in both order and color, in minimum turns.</p>
        <ol>
            <li>Click the ball to change its color.</li>
            <li>Use drag-n-drop to swap two balls.</li>
        </ol>
        <p>After each guess you get a feedback: black or white key marks.</p>
        <p>A black key mark is placed for each ball from the guess which is correct in both color and position.</p>
        <p>A white key mark indicates the existence of a correct color ball placed in the wrong position.</p>
        <p>Once feedback is provided, another guess is made.</p>
        <p>Guesses and feedback continue to alternate until you guess correctly or reach the limit of attempts.</p>
    </div>
}

export default Tutorial;
