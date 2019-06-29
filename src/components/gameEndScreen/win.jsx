import React from 'react';
import fadeIn from 'components/fadeInHOC';

const Win = ({ restart, secret }) => (
    <div className='game-result'>
        <hr />
        <p className='game-result__text'>Congratulations, You win!</p>
        <div className='btn-block'>
            <button type='button' className='btn-block__button' onClick={() => restart(secret.length)}>
                {'Play again'}
            </button>
        </div>
    </div>
);

export default fadeIn(Win);
