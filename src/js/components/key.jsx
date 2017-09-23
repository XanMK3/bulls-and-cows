'use strict';

import React, { Component } from 'react';

function Key(props) {
    return (
        <div className="key-panel">
            {[...Array.apply(null, { length: props.exactMatch }).map((v, i) => <span key={`b${i}`} className='key bull'></span>),
              ...Array.apply(null, { length: props.looseMatch }).map((v, i) => <span key={`c${i}`} className='key cow'></span>)]}
        </div>
    )
}

export default Key;
