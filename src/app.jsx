'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/components/sceneManager';

import './css/main.scss';
import svgxhr from 'webpack-svgstore-plugin/src/helpers/svgxhr';
const __sprite__ = { path: './assets/svg/*.svg', name: 'assets/sprite.svg' };
svgxhr(__sprite__);

ReactDOM.render(<App />, document.querySelector('.root'));

(function () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
            .then(() => console.info('Service Worker registered successfully.'))
            .catch(error => console.error('Service Worker registration failed:', error));
    }
})()
