let id = 0;

export function getId() {
    return id++;
}

export function getRandomInt(...args) {
    if (arguments.length === 1) {
        const max = args[0];
        return Math.floor(max * Math.random());
    }
    const min = args[0];
    const max = args[1];
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomArray(length) {
    return Array.from({ length }).map(() => getRandomInt(length - 1));
}

export function isEqual(a1, a2) {
    return a1.length === a2.length && a1.every((v, i) => v === a2[i]);
}

export function countMatchElements(array, target) {
    const exactMatch = target.reduce((sum, v, i) => (v === array[i] ? ++sum : sum), 0);

    const sortedTarget = [...target]
        .sort((a, b) => a > b)
        .reduce((obj, v) => {
            if (obj[v] > 0) {
                obj[v]++;
            }
            else {
                obj[v] = 1;
            }

            return obj;
        }, {});

    const sortedArray = [...array]
        .sort((a, b) => a > b)
        .reduce((obj, v) => {
            if (obj[v] > 0) {
                obj[v]++;
            }
            else {
                obj[v] = 1;
            }

            return obj;
        }, {});

    const looseMatch = Object
        .keys(sortedTarget)
        .reduce(
            (matchNumber, key) => matchNumber + Math.min(sortedTarget[key], sortedArray[key] || 0),
            0,
        ) - exactMatch;

    return { exactMatch, looseMatch };
}

const isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;

export function checkSmoothScrollSupport() {
    return isSmoothScrollSupported;
}
