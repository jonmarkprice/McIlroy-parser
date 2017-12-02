const { t } = require('./tokens');
const library = require('./library');
const { Right, Left } = require('sanctuary');
// tokenize_

// generator?
function parseString(str) {
  if (str === '') {
    return Left("No input.");
  }
  else if (str === ':') {
    return Right({value: ':', token: 'Syntax'});
  }
  else if (str === 'true') {
    return Right({value: true, type: t.bool, token: 'Value'});
  }
  else if (str === 'false') {
    return Right({value: false, type: t.bool, token: 'Value'});
  }
  else if (str === '[]') {
    return Right({value: [], type: t.list, token: 'Value'});
  }
  else if (/'.'/.test(str)) {
    return Right({value: str[1], type: t.char, token: 'Value'});
  }
  // TODO: Maybe add some sugar for strings
  //else if (/".*"/.test(str)) {
  //  return {type: 'string'};
  //}
  else if (! Number.isNaN(Number(str))) {
    return Right({value: Number(str), type: t.num, token: 'Value'});
  }
  // TODO similarly, scan aliases
  else if (library.has(str)) {
    return Right({value: library.get(str), type: t.fn, token: 'Value'});
  }
  else {
    //throw new Error('Invalid token');
    return Left(`Invalid token: ${str}.`);
  }
}

module.exports = parseString;
