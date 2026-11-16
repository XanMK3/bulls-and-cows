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
  return Array.from({ length }).map(() => getRandomInt(length));
}

export function isEqual(a1, a2) {
  return a1.length === a2.length && a1.every((v, i) => v === a2[i]);
}

export function countMatchElements(array, target) {
  const exactMatch = target.reduce((sum, v, i) => (v === array[i] ? ++sum : sum), 0);

  const targetCounts = target
    .reduce((obj, v) => {
      if (obj[v] > 0) {
        obj[v]++;
      }
      else {
        obj[v] = 1;
      }

      return obj;
    }, {});

  const arrayCounts = array
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
    .keys(targetCounts)
    .reduce(
      (matchNumber, key) => matchNumber + Math.min(targetCounts[key], arrayCounts[key] ?? 0),
      0,
    ) - exactMatch;

  return { exactMatch, looseMatch };
}
