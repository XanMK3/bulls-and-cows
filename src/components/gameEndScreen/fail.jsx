import React from 'react';
import Board from 'components/board';
import { useFadeIn } from 'hooks';

const Fail = ({ restart, secret }) => {
    const ref = useFadeIn();

    return (
        <div ref={ref} className='game-result'>
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
};

export default Fail;
