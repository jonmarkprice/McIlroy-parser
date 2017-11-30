const test = require('tape');
const S = require('sanctuary');
const { last } = require('../../src/sanctuary-either');
// TODO: also do dropLast, takeLast

const { Left, Right } = S;

test('last', assert => {
  assert.deepEqual(
    last([]),
    Left('empty')
  );

  assert.deepEqual(
    S.chain(last, Right([])),
    Left('empty')
  );

  assert.end();
});
