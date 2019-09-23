const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

function isMatched(char, previousChar) {
    return (previousChar.char === '{' && char === '}') ||
        (previousChar.char === '(' && char === ')') ||
        (previousChar.char === '[' && char === ']');

}

function output(message) {
    console.log(message);

    process.exit();
}

function isEmpty(stack) {
    return stack.length === 0;
}

rl.on('line', function (input) {
    const len = input.length;

    const stackOfOpeningBrackets = [];
    const openedBrackets = ['{', '[', '('];
    const closedBrackets = ['}', ']', ')'];

    for (let i = 0; i < len; i += 1) {
        let char = input[i];
        let position = i + 1;

        if (openedBrackets.includes(char)) {
            stackOfOpeningBrackets.push({char, position});
        } else if (closedBrackets.includes(char)) {
            if (isEmpty(stackOfOpeningBrackets)) output(position);

            if (closedBrackets.includes(char) && !isMatched(char, stackOfOpeningBrackets.pop())) {
                output(position)
            }
        }
    }

    if (!isEmpty(stackOfOpeningBrackets)) {
        return output(stackOfOpeningBrackets.pop().position);
    }

    output('Success');
});
