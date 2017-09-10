'use strict';

import React, { PureComponent } from 'react';

import Result from './result';
import Ball from './draggableBall';

import { countMatchElements } from 'js/utils';

class Board extends PureComponent {
    render() {
        const props = this.props;

        return (
            <div className='board'>
                <ul className='guess-panel'>{props.try.map((type, i) =>
                    <li className='guess-panel__item' key={i}>
                        <Ball index={i} type={type} readOnly={props.readOnly} onChange={props.onChange} onSwap={props.onSwap} />
                    </li>
                )}</ul>
                {props.readOnly ? <Result {...countMatchElements(props.try, props.secret)} /> :
                <button type='button' className='guess-panel__btn' onClick={props.onSubmit}>
                    <svg className='svg-icon'><use xlinkHref="assets/sprite.svg#check"></use></svg>
                </button>}
            </div>
        )
    }
}

export default Board;
