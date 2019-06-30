import React from 'react';
import './style';

const Key = ({ exactMatch, looseMatch }) => (
    <div className='key-panel'>
        {[
            ...Array.apply(null, { length: exactMatch }).map((v, i) => <span key={`b${i}`} className='key bull' />),
            ...Array.apply(null, { length: looseMatch }).map((v, i) => <span key={`c${i}`} className='key cow' />),
        ]}
    </div>
);

export default Key;
