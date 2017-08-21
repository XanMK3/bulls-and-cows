'use strict';

import React from 'react';
import cn from 'classnames';

import Result from './result'

const COLORS = ['red', 'yellow', 'green', 'blue', 'orange', 'aqua', 'violet'];

function Board(props) {
    const balls = props.colors.map((n, i) =>
        <span key={i} style={{ backgroundColor: COLORS[props.colors[i]] }} className={cn('ball', { active: !props.readOnly })}
              onClick={props.readOnly ? null : e => { props.onChange(i) }}></span>
    )

    return (
        <div className='board'>
            <div className='guess-panel'>{balls}</div>
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
