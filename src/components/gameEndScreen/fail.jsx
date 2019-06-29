import React from 'react';
import fadeIn from 'components/fadeInHOC';
import Board from 'components/board';

const Fail = ({ restart, secret }) => (
    <div className='game-result'>
        <hr />
        <p className='game-result__text'>You lose! Secret is:</p>
        <Board guess={secret} />
        <div className='btn-block'>
            <button type='button' className='btn-block__button' onClick={() => restart(secret.length)}>
                {'Play again'}
            </button>
        </div>
    </div>
);

export default fadeIn(Fail);
