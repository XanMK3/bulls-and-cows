'use strict';

import React from 'react';

import Result from './result';
import Ball from './draggableBall';

function Board(props) {
    return (
        <div className='board'>
            <ul className='guess-panel'>{props.colors.map((type, i) =>
                <li className='guess-panel__item' key={i}><Ball index={i} type={type} readOnly={props.readOnly} onChange={props.onChange} onSwap={props.onSwap} /></li>
            )}</ul>
            {props.readOnly ? <Result {...props.result} /> :
            <button type='button' className='guess-panel__btn' onClick={props.onSubmit}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </button>}
        </div>
    )
}

export default Board;
