function sumSalary(salaries) {
  let summ = 0;
  for (let key in salaries) {
    console.log(salaries[key]);    
    if (isFinite(salaries[key])) summ += salaries[key];
  }
  return summ;
}

