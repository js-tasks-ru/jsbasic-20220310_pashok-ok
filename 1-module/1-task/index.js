function factorial(n) {
  if (n === 0 | n === 1) {
    return 1;
    
  }
  else {
    let res = 1
    for (let i = 1; i <= n; i++) {
      res = res * i;
    }
    return res;

  }
}
