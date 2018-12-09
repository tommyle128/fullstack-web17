'use strict'

function sort(input) {
  // return input.sort((a,b) => a-b); // Remove this line and change to your own algorithm
    for (let i = 0; i < input.length; i++) {
        for (let j = i+1; j < input.length; j++) {
            if (input[i] > input[j]) {
                var a = input[j];
                input[j] = input[i];
                input[i] = a;
            }
        }
    }
    return input;
}


module.exports = sort





