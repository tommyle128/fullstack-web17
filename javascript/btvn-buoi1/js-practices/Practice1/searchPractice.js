'use strict'

function search(input, target) {
  // return  input.indexOf(target);  // Remove this line and change to your own algorithm
  var result = false;
  for (let i = 0; i < input.length; i++){
    if (target == input[i]) {
      result = true;
      return i;
    }
  }
  if (result == false) {
    return -1;
  }
}

module.exports = search

