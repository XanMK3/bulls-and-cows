import React, { PureComponent } from 'react';
import Key from 'components/key';
import Ball from 'components/ballDraggable';
import { countMatchElements } from 'utils';
import './style';

class Board extends PureComponent {
    getKey() {
        const { guess, secret } = this.props;
        return secret
            ? countMatchElements(guess, secret)
            : {};
    }

    render() {
        const {
            guess, active, onChange, onSwap, onSubmit,
        } = this.props;

        return (
            <div className='board'>
                <ul className='guess-panel'>
                    {guess.map((type, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <li className='guess-panel__item' key={i}>
                            <Ball
                                index={i}
                                type={type}
                                readOnly={!active}
                                onChange={onChange}
                                onSwap={onSwap}
                            />
                        </li>
                    ))}
                </ul>
                {active
                    ? (
                        <button type='button' className='guess-panel__btn' onClick={onSubmit}>
                            <svg className='svg-icon'><use xlinkHref='assets/sprite.svg#check' /></svg>
                        </button>
                    )
                    : <Key {...this.getKey()} />
                }
            </div>
        );
    }
}

export default Board;
