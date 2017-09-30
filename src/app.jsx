'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './js/components/sceneManager';

import './styles/main.scss';
import svgxhr from 'webpack-svgstore-plugin/src/helpers/svgxhr';
const __sprite__ = { path: './assets/svg/*.svg', name: 'assets/sprite.svg' };
svgxhr(__sprite__);

ReactDOM.render(<AppContainer><App /></AppContainer>, document.querySelector('.root'))

if (module.hot) {
    module.hot.accept('./js/components/sceneManager', () => {
        const NextApp = require('./js/components/sceneManager').default;
        ReactDOM.render(<AppContainer><NextApp /></AppContainer>, document.querySelector('.root'));
    });
}

(function () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
            .then(() => console.info('Service Worker registered successfully.'))
            .catch(error => console.error('Service Worker registration failed:', error));
    }
})()
