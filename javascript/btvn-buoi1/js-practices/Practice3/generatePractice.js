'use strict'

function generate(testLengthArray){
  // return Array.from({length : testLengthArray.length})
  //   .map(item => ({
  //     input: Array.from({length: item}).map(item => []),
  //     target: 0,
  //     output: -1
  //   })
  // ); // Remove this line and change to your own algorithm
  var allData = [];
  var targetAllTypes = ["Not found", "First", "Last", "Mid"];

  // generate input numbers ascendingly:
  for (let l=0; l < testLengthArray.length; l++) {
    var input = [];
    var data = {};
    var min = -9999;
    var max = 9999;
    for (let k=0; k < testLengthArray[l]; k++) {
      var numb = Math.floor(Math.random() * (max - min + 1)) + min;
      input[k] = numb;
    }
    
    for (let i = 0; i < input.length; i++) {
      for (let j = i+1; j < input.length; j++) {
        if (input[i] > input[j]) {
            var a = input[j];
            input[j] = input[i];
            input[i] = a;
        }
      }
    }

    // create remove function based on array and item
    function removeItem (arr, item) { 
      for (let y=0; y < 4; y++) {
        if (arr[y] === item) {
          arr.splice(y, 1);
        }
      }
      return arr;
    }
    
    // generate 4 cases of target
    if (testLengthArray.length >= 4) {
      
      var targetType = targetAllTypes[Math.floor(Math.random()*targetAllTypes.length)];
      var target = Math.floor(Math.random() * (max - min + 1)) + min;
      if (targetType == "Not found") {
        var running = true;
        while (running == true) {
          target = Math.floor(Math.random() * (max - min + 1)) + min;
          var count = 0;
          for (let t = 0; t < input.length; t++) {
            if (input[t] != target) {
              count += 1;
            }
          }
          if (count == input.length) {
            running = false;
          }
        }
        removeItem(targetAllTypes, "Not found");
        
      } else if (targetType == "First") {
        target = input[0];
        removeItem(targetAllTypes, "First");
        
      } else if (targetType == "Last") {
        target = input[input.length-1];
        removeItem(targetAllTypes, "Last");
        
      } else if (targetType == "Mid") {
        var input2 = input;
        removeItem(input2, input2[0]);
        removeItem(input2, input2[input2.length-1]);
        target = input2[Math.floor(Math.random()*input2.length)];
        removeItem(targetAllTypes, "Mid");
        
      } 
      if (targetAllTypes.length == 0) {
        targetAllTypes = ["Not found", "First", "Last", "Mid"];
      }
    }
    
    data["input"] = input;
    data["target"] = target;

    // search index of target:
    var result = false;  
      for (let n = 0; n < input.length; n++){
        if (target == input[n]) {
          result = true;
          data["output"] = n;
        }
      }
      if (result == false) {
        data["output"] = -1;
      }
    
    allData.push(data);  
  }
  return allData;

}

module.exports = generate

// testLengthArry to test below:
// var testLengthArray = [15, 5, 9, 8, 7, 6]
// var testLengthArray = [187,158,442,474,154,73,228,205,370,320,399,494,100,84,462,275,335,448,309,221,32,427,439,144,448,182,88,213,174,133,427,420,155,11,247,487,387,110,89,299,136,498,67,223,347,135,220,84,20,20,319,480,385,130,74,195,326,286,299,181,81,423,172,224,431,279,96,127,195,75,328,452,199,313,252,128,390,322,91,356,27,363,206,7,38,72,56,244,470,146,444,30,164,225,438,303,382,33,390,56,421,463,224,442,185,416,125,76,89,488,127,226,42,499,77,463,114,407,101,490,375,22,413,166,176,128,146,431,253,203,326,463,104,263,12,436,267,461,18,301,44,1,365,240,97,193,298,78,400,111,396,294,212,445,150,313,487,252,60,326,245,264,154,108,78,274,94,200,260,329,415,430,58,360,432,480,57,328,119,400,69,208,240,334,95,490,94,312,18,59,259,490,485,62,266,175,198,85,457,139,275,412,208,77,470,44,488,235,494,499,126,83,27,324,401,61,394,362,96,462,171,335,208,99,17,57,40,360,346,299,201,227,189,488,85,372,83,279,345,345,474,388,211,97,293,207,298,168,219,192,443,446,442,269,393,448,451,270,201,289,458,63,293,420,223,486,466,185,35,422,349,428,3,351,297,6,150,76,362,304,88,67,69,147,127,198,309,467,95,319,79,120,271,363,419,372,457,457,44,475]

// var finalResult = generate(testLengthArray);
// console.log(finalResult);







