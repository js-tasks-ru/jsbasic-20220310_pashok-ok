function camelize(str) {
  str = str.toLowerCase();
  let resultStr = '';
  for (i = 0; i < str.length;) {
    if (str[i] === '-') {
      i += 1;      
      resultStr += str[i].toUpperCase();
      i +=1;
    }
    else {
      resultStr += str[i];
      i += 1;
    }
       
  }
  return resultStr;
}

//console.log(camelize('-webkit-transition'));
