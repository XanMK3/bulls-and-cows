import React from 'react';
import { useFadeIn } from 'hooks';

const Win = ({ restart, secret }) => {
    const ref = useFadeIn();

    return (
        <div ref={ref} className='game-result'>
            <hr />
            <p className='game-result__text'>Congratulations, You win!</p>
            <div className='btn-block'>
                <button type='button' className='btn-block__button' onClick={() => restart(secret.length)}>
                    {'Play again'}
                </button>
            </div>
        </div>
    );
};

export default Win;
