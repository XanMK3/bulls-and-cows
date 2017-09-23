'use strict';

import React from 'react';

function Win(props) {
    return <div className='game-result'>
        <hr />
        <p className='game-result__text'>Congratulations, You win!</p>
        <div className='btn-block'>
            <button type='button' className='btn-block__button' onClick={e => { props.restart(props.secret.length) }}>Play again</button>
        </div>
    </div>
}

export default Win;
