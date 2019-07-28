import React from 'react';
import './style';

const Key = ({ exactMatch, looseMatch }) => (
    <div className='key-panel'>
        {[
            // eslint-disable-next-line react/no-array-index-key
            ...Array.from({ length: exactMatch }).map((v, i) => <span key={`b${i}`} className='key bull' />),
            // eslint-disable-next-line react/no-array-index-key
            ...Array.from({ length: looseMatch }).map((v, i) => <span key={`c${i}`} className='key cow' />),
        ]}
    </div>
);

export default Key;
