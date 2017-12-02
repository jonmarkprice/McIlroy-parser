const test = require('tape');
const parseString = require('../src/parse-string');
const { Right, Left, fromEither } = require('sanctuary');

test('literal values', assert => {
  assert.deepEqual(
    parseString('42'),
    Right({token: 'Value', type: {name: 'Number'}, value: 42}));

  assert.deepEqual(
    parseString("'x'"),
    Right({token: 'Value', type: {name: 'Char'}, value: 'x'}));

  assert.deepEqual(
    parseString(""),
    Left('No input.'));

  assert.end();
}) 

test('functions', assert => {
  const fn = fromEither({}, parseString('+'));
  assert.equal(fn.token, 'Value');
  assert.equal(fn.type.name, 'Function');
  assert.equal(fn.value.display, '+');
  assert.equal(fn.value.arity, 2);
  assert.end();
});
