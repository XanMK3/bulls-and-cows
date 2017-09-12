'use strict';

import React, { PureComponent } from 'react';

import Result from './result';
import Ball from './draggableBall';

import { countMatchElements } from 'js/utils';

class Board extends PureComponent {
    checkResult() {
        const { guess, secret } = this.props;
        return secret ? countMatchElements(guess, secret) : {};
    }

    render() {
        const { guess, readOnly, onChange, onSwap, onSubmit } = this.props;

        return (
            <div className='board'>
                <ul className='guess-panel'>{guess.map((type, i) =>
                    <li className='guess-panel__item' key={i}>
                        <Ball index={i} type={type} readOnly={readOnly} onChange={onChange} onSwap={onSwap} />
                    </li>
                )}</ul>
                {readOnly ? <Result {...this.checkResult()} /> :
                <button type='button' className='guess-panel__btn' onClick={onSubmit}>
                    <svg className='svg-icon'><use xlinkHref="assets/sprite.svg#check"></use></svg>
                </button>}
            </div>
        )
    }
}

export default Board;
