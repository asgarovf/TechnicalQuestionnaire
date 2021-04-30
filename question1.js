const input = ` 1
               8 4
              2 6 9
             8 5 9 3`;

//the input format should be the same (string declaration with ``)

//check whether number is prime or not
const isPrime = (num) => {
  let flag = false;
  if (num == 1) {
    return false;
  }
  for (let i = 2; i <= num / 2; ++i) {
    if (num % i == 0) {
      flag = true;
      break;
    }
  }
  return !flag;
};

//format the input
const array = input
  .split(" ")
  .filter((item) => item != "")
  .map((item) => item.replace("\n", ""));

//depth of triangle, if we make it look like a tree
let depth = 0;

//determine depth
const matrixSize = input
  .split(" ")
  .filter((item) => item != "")
  .forEach((item) => {
    if (item.includes("\n")) depth++;
  });
depth++;

//generate matrix from the input
var incrementSize = 1;
let matrix = new Array();
for (let i = 0; i < array.length; i += incrementSize - 1) {
  let matrixArr = new Array();
  for (let j = i; j < incrementSize + i; j++) {
    matrixArr.push(parseInt(array[j], 10));
  }
  matrix.push(matrixArr);
  incrementSize++;
}

const stackArray = []; // we will use stack data structure
var sum = 0; // initially sum is 0

const findMaximumPath = (i, j) => {
  //if we do not have a prime number
  if (!isPrime(matrix[i][j])) {
    if (i !== 0) {
      stackArray.push(stackArray[stackArray.length - 1] + matrix[i][j]); // push the top element + the current element
    } else {
      stackArray.push(matrix[i][j]); // push the first item
    }

    if (i < depth - 1) {
      //call recursively until we reach the bottom
      findMaximumPath(i + 1, j);
      findMaximumPath(i + 1, j + 1);
    } else if (i === depth - 1) {
      //if we are in the very bottom of the tree, set current sum to top element
      if (stackArray[stackArray.length - 1] > sum) {
        sum = stackArray[stackArray.length - 1];
      }
    }
    stackArray.pop();
  }
};
//initial call
findMaximumPath(0, 0);

console.log("Maximum path:", sum);
