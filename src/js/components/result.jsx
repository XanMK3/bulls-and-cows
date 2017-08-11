'use strict';

import React, { Component } from 'react';

function Result(props) {
    return (
        <div className="result-panel">
            {[...Array.apply(null, { length: props.bulls }).map((v, i) => <span key={`b${i}`} className='key bull'></span>),
              ...Array.apply(null, { length: props.cows }).map((v, i) => <span key={`c${i}`} className='key cow'></span>)]}
        </div>
    )
}

export default Result;
