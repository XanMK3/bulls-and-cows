import React, { memo, useMemo } from 'react';
import cn from 'classnames';
import Key from 'components/key';
import Ball from 'components/ballDraggable';
import { countMatchElements } from 'utils';
import './style';

const Board = memo(({
    data,
    secret,
    active,
    onChange,
    onSwap,
    onSubmit,
}) => {
    const keyData = useMemo(() => (secret ? countMatchElements(data, secret) : {}), [data, secret]);

    return (
        <div
            className={cn('board', { 'board--active': active })}
            data-length={data.length}
        >
            <ul className='guess-panel'>
                {data.map((kind, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <li className='guess-panel__item' key={i}>
                        <Ball
                            index={i}
                            kind={kind}
                            readOnly={!active}
                            onChange={onChange}
                            onSwap={onSwap}
                        />
                    </li>
                ))}
            </ul>
            {active
                ? (
                    <button
                        type='button'
                        className='guess-panel__btn'
                        onClick={onSubmit}
                        aria-label='Submit guess'
                        title='Submit guess'
                    >
                        <svg className='svg-icon'><use xlinkHref='assets/sprite.svg#check' /></svg>
                    </button>
                )
                : secret
                    ? <Key {...keyData} />
                    : <div className='key-panel' style={{ visibility: 'hidden' }} />}
        </div>
    );
});

Board.displayName = 'Board';

export default Board;
