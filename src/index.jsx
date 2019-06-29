import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/app';
import { preventPullDownToRefresh } from 'utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import svgxhr from 'webpack-svgstore-plugin/src/helpers/svgxhr';
import 'styles/main.scss';

const svgSprite = { path: './assets/svg/*.svg', name: 'assets/sprite.svg' };
svgxhr(svgSprite);

preventPullDownToRefresh();

ReactDOM.render(
    <App />,
    document.querySelector('.root'),
);

(function registerSW() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
            // eslint-disable-next-line no-console
            .then(() => console.info('Service Worker registered successfully.'))
            // eslint-disable-next-line no-console
            .catch(error => console.error('Service Worker registration failed:', error));
    }
}());
