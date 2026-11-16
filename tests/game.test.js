import assert from 'node:assert/strict';
import test from 'node:test';
import reducer from '../src/components/game/reducer.js';
import { countMatchElements, getRandomArray } from '../src/utils/index.js';

const initialState = () => ({
  status: 'progress',
  secret: [3, 3, 3, 3],
  history: [],
  activeBoard: [0, 1, 2, 3],
  attemptsNumber: 8,
});

const submit = (state) => reducer(state, { type: 'board:submit' });

test('all eight attempts are available, with failure only after the eighth miss', () => {
  let state = initialState();
  for (let attempt = 1; attempt < 8; attempt++) {
    state = submit(state);
    assert.equal(state.status, 'progress');
    assert.equal(state.history.length, attempt);
  }
  state = submit(state);
  assert.equal(state.status, 'fail');
  assert.equal(state.history.length, 8);
});

test('a correct final attempt wins and does not mutate previous state', () => {
  let state = initialState();
  for (let attempt = 0; attempt < 7; attempt++) state = submit(state);
  const finalGuess = { ...state, activeBoard: [...state.secret] };
  assert.equal(submit(finalGuess).status, 'win');
  assert.equal(finalGuess.history.length, 7);
});

test('each supported length includes the lowest and highest color', (t) => {
  const random = t.mock.method(Math, 'random');
  for (const length of [4, 5, 6]) {
    random.mock.mockImplementation(() => 0);
    assert.deepEqual(getRandomArray(length), Array(length).fill(0));
    random.mock.mockImplementation(() => 1 - Number.EPSILON);
    assert.deepEqual(getRandomArray(length), Array(length).fill(length - 1));
  }
});

test('feedback counts duplicates once and excludes exact matches from misplaced matches', () => {
  assert.deepEqual(countMatchElements([0, 0, 1, 1], [0, 1, 0, 2]), {
    exactMatch: 1, looseMatch: 2,
  });
  assert.deepEqual(countMatchElements([1, 1, 1, 1], [1, 2, 2, 2]), {
    exactMatch: 1, looseMatch: 0,
  });
  assert.deepEqual(countMatchElements([0, 1, 2, 3], [0, 1, 2, 3]), {
    exactMatch: 4, looseMatch: 0,
  });
});

test('starting or restarting clears the round and applies the selected difficulty', () => {
  let state = null;
  for (const length of [4, 4, 5, 6]) {
    const secret = Array(length).fill(length - 1);
    state = reducer(state, { type: 'game:start', payload: { id: length, secret } });
    assert.equal(state.status, 'progress');
    assert.deepEqual(state.history, []);
    assert.deepEqual(state.activeBoard, Array.from({ length }, (_, i) => i));
    assert.deepEqual(state.secret, secret);
    assert.equal(state.attemptsNumber, (2 * length - 4) * 2);
    state = submit(state);
    assert.equal(state.history.length, 1);
  }
});
