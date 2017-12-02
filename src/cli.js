const readline = require('readline');
const parseString = require('./parse-string');
const { parser } = require('./program');
const display = require('./display');
const S = require('sanctuary');
const { Right } = S;


const appendRight =  S.lift2(list => elem => S.append(elem, list));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> '
});

rl.prompt();

rl.on('line', (line) => {
  const fragments = line.trim().split(' ');
  // const tokens = fragments.map(parseString);
  const tokens = S.pipe([
    // line.trim().split(' '),
    S.map(parseString),
    S.reduce(appendRight, Right([]))
  ])(fragments);

  // const tokens = S.reduce(appendRight, Right([]), _);

  //const result = parseProgram(tokens);
  const result = S.map(parser, tokens);

  // console.log(fragments);
  // console.log(tokens);
  // console.log(t2);
  // console.log(result);

  console.log("----------------------------");
  if (S.isLeft(result)) {
    console.log(S.fromEither('', result));
    console.log(S.either(S.I, S.K(''), result));
  }
  const steps = S.either(S.K([]), S.prop('steps'), result);

  steps.forEach((step, index) => {
    const width = 3 - Math.floor(Math.log(index + 1) / Math.log(10));
    const padding = ' '.repeat(width);
    console.log(`${index + 1}.${padding} ${step.join(' ')}`);
  });

  rl.prompt();
})
.on('close', () => {
  console.log('bye');
  process.exit(0);
});


