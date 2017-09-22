'use strict';

import React, { PureComponent } from 'react';

import Result from './result';
import Ball from './draggableBall';

import { countMatchElements, checkSmoothScrollSupport } from 'js/utils';

const isSmoothScrollSupported = checkSmoothScrollSupport();
const FADE_TIMEOUT = 400;

class Board extends PureComponent {
    checkResult() {
        const { guess, secret } = this.props;
        return secret ? countMatchElements(guess, secret) : {};
    }

    componentDidMount() {
        if (!isSmoothScrollSupported) return;

        this.node.scrollIntoView({
            behavior: 'smooth',
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.tryNumber != this.props.tryNumber) {
            this.node.classList.add('fade-in');
            setTimeout(() => {
                this.node.classList.remove('fade-in');
            }, FADE_TIMEOUT);
        }
    }

    render() {
        const { guess, readOnly, onChange, onSwap, onSubmit } = this.props;

        return (
            <div className='board' ref={(node) => { this.node = node; }}>
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
