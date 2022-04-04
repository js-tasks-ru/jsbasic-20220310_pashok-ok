function filterRange(arr, a, b) {
  let arrayResult = [];
  for (val of arr) {
    if (val >= a && val <= b) {
      arrayResult.push(val);
    }  
  }
  return arrayResult;
}
