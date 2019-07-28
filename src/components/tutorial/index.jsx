import React from 'react';
import './style';

const Tutorial = () => (
    <div className='tutorial'>
        <h2>About game</h2>
        <p>
            Your goal is to guess a secret combination of balls,
            in both order and color, in minimum attempts.
        </p>
        <p>Choose your guess combination by using one of two options:</p>
        <ol>
            <li>click the ball to change its color</li>
            <li>use drag-n-drop to swap balls</li>
        </ol>
        <p>After each guess you get a feedback - black and white key marks.</p>
        <p>A black key mark is placed for each ball which is correct in both color and position.</p>
        <p>
            A white key mark indicates the existence of a correct color ball
            placed in the wrong position.
        </p>
        <p>Repeat until you guess correctly or reach the limit of attempts.</p>
    </div>
);

export default Tutorial;
