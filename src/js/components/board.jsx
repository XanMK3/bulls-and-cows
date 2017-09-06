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
                <svg className='svg-icon'><use xlinkHref="assets/sprite.svg#check"></use></svg>
            </button>}
        </div>
    )
}

export default Board;
