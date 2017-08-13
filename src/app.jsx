'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/components/gameManager';

import './css/main.scss';

ReactDOM.render(<App />, document.querySelector('.root'));

(function () {
    if ('serviceWorker' in navigator) {
        if (navigator.serviceWorker.controller) {
            console.info('Active service worker found, no need to register')
        }
        else {
            navigator.serviceWorker.register('./service-worker.js')
                .then(() => console.info('Service Worker registered successfully.'))
                .catch(error => console.error('Service Worker registration failed:', error));
        }
    }
})()
