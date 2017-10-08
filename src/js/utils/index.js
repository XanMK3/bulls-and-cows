'use strict';

let _id = 0;

export function getId() {
    return _id++;
}

export function getRandomInt() {
    if (arguments.length == 1) {
        const max = arguments[0];
        return Math.floor(max * Math.random());
    }
    else {
        const min = arguments[0], max = arguments[1];
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export function getRandomArray(n) {
    return Array.apply(null, { length: n }).map(() => getRandomInt(n - 1));
}

export function isEqual(a1, a2) {
    return a1.length == a2.length && a1.every((v, i) => v === a2[i]);
}

export function countMatchElements(array, target) {
    const exactMatch = target.reduce((sum, v, i) => v === array[i] ? ++sum : sum, 0);

    const sortedTarget = target.slice().sort((a, b) => a > b).reduce((obj, v) =>
        (obj[v] > 0 ? obj[v]++ : obj[v] = 1, obj), {})

    const sortedArray = array.slice().sort((a, b) => a > b).reduce((obj, v) =>
        (obj[v] > 0 ? obj[v]++ : obj[v] = 1, obj), {})

    const looseMatch = Object.keys(sortedTarget).reduce((matchNumber, key) =>
        matchNumber += Math.min(sortedTarget[key], sortedArray[key] || 0), 0) - exactMatch;

    return { exactMatch, looseMatch };
}

const isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;

export function checkSmoothScrollSupport() {
    return isSmoothScrollSupported;
}

export function preventPullDownToRefresh() {
    let maybePreventPullToRefresh = false;
    let lastTouchY = 0;

    const touchstartHandler = function (e) {
        if (e.touches.length != 1) return;
        lastTouchY = e.touches[0].clientY;
        // Pull-to-refresh will only trigger if the scroll begins when the
        // document's Y offset is zero.
        maybePreventPullToRefresh = window.pageYOffset == 0;
    }

    const touchmoveHandler = function (e) {
        const touchY = e.touches[0].clientY;
        const touchYDelta = touchY - lastTouchY;
        lastTouchY = touchY;

        if (maybePreventPullToRefresh) {
            // To suppress pull-to-refresh it is sufficient to preventDefault the
            // first overscrolling touchmove.
            maybePreventPullToRefresh = false;
            if (touchYDelta > 0) {
                e.preventDefault();
                return;
            }
        }
    }

    document.addEventListener('touchstart', touchstartHandler, { passive: false });
    document.addEventListener('touchmove', touchmoveHandler, { passive: false });
}
