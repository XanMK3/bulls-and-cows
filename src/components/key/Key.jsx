/* eslint-disable react/no-array-index-key */
import React from 'react';
import './style';

const Key = ({ exactMatch, looseMatch }) => (
  <div
    className='key-panel'
    role='img'
    aria-label={`${exactMatch} exact matches, ${looseMatch} misplaced colors`}
  >
    {[
      ...Array.from({ length: exactMatch }).map((v, i) => <span key={`b${i}`} className='key bull' aria-hidden='true' />),
      ...Array.from({ length: looseMatch }).map((v, i) => <span key={`c${i}`} className='key cow' aria-hidden='true' />),
    ]}
  </div>
);

export default Key;
