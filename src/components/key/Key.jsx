/* eslint-disable react/no-array-index-key */
import React from 'react';
import './style';

const Key = ({ exactMatch, looseMatch }) => (
    <div className='key-panel'>
        {[
            ...Array.from({ length: exactMatch }).map((v, i) => <span key={`b${i}`} className='key bull' />),
            ...Array.from({ length: looseMatch }).map((v, i) => <span key={`c${i}`} className='key cow' />),
        ]}
    </div>
);

export default Key;
