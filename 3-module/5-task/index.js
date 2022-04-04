function getMinMax(str) {
  let workArr = str.split(' ');
  let resultArr = [];
  for (val of workArr) {
    if (isFinite(val)) resultArr.push(Number(val));
  }
  resultArr.sort( (a, b) => a - b);
  return { min: resultArr[0], 
    max: resultArr[resultArr.length - 1]};
}

