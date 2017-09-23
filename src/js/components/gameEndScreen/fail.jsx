'use strict';

import React from 'react';

import Board from '../board';

function Fail(props) {
    return <div className='game-result'>
        <hr />
        <p className='game-result__text'>You lose! Secret is:</p>
        <Board guess={props.secret} />
        <div className='btn-block'>
            <button type='button' className='btn-block__button' onClick={e => { props.restart(props.secret.length) }}>Play again</button>
        </div>
    </div>
}

export default Fail;
